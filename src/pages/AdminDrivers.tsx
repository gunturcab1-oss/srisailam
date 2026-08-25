import React, { useMemo, useState } from 'react';
import { FLEET_DATA } from '@/constants.tsx';
import {
  AvailabilityStatus,
  DriverLocation,
  DriverStatus,
  PreviewDriver,
  availabilityLabels,
  getDrivers,
  locationLabels,
  saveDrivers,
} from '@/services/driverPreviewStore.ts';

const emptyForm = {
  name: '', username: '', password: '', mobile: '',
  vehicle: FLEET_DATA[0]?.name || '', vehicleNumber: '',
  status: 'active' as DriverStatus,
  location: 'markapur' as DriverLocation,
  availability: 'available' as AvailabilityStatus,
};

type EditForm = Omit<PreviewDriver, 'password'> & { newPassword: string };

const AdminDrivers: React.FC = () => {
  const [drivers, setDrivers] = useState<PreviewDriver[]>(() => getDrivers());
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

  const nextDriverId = useMemo(() => {
    const max = drivers.reduce((value, driver) => Math.max(value, Number(driver.id.replace('DRV-', '')) || 0), 0);
    return `DRV-${String(max + 1).padStart(3, '0')}`;
  }, [drivers]);

  const persist = (next: PreviewDriver[]) => { setDrivers(next); saveDrivers(next); };
  const updateField = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.username.trim() || !form.password.trim() || !form.mobile.trim() || !form.vehicleNumber.trim()) {
      setMessage('Please complete all required driver details.'); return;
    }
    if (!/^\d{10}$/.test(form.mobile.trim())) { setMessage('Please enter a valid 10-digit mobile number.'); return; }
    if (drivers.some((driver) => driver.username.toLowerCase() === form.username.trim().toLowerCase())) {
      setMessage('That username is already used. Please choose another username.'); return;
    }

    const newDriver: PreviewDriver = {
      id: nextDriverId,
      name: form.name.trim(), username: form.username.trim(), password: form.password,
      mobile: form.mobile.trim(), vehicle: form.vehicle,
      vehicleNumber: form.vehicleNumber.trim().toUpperCase(), status: form.status,
      location: form.location, availability: form.availability,
    };
    persist([...drivers, newDriver]);
    setMessage(`Driver ${newDriver.name} created. Username: ${newDriver.username}`);
    setForm(emptyForm);
  };

  const toggleStatus = (driverId: string) => {
    persist(drivers.map((driver) => driver.id === driverId ? { ...driver, status: driver.status === 'active' ? 'disabled' : 'active' } : driver));
  };

  const updateLocation = (driverId: string, location: DriverLocation) => {
    persist(drivers.map((driver) => driver.id === driverId ? { ...driver, location } : driver));
  };

  const updateAvailability = (driverId: string, availability: AvailabilityStatus) => {
    persist(drivers.map((driver) => driver.id === driverId ? { ...driver, availability } : driver));
  };

  const startEdit = (driver: PreviewDriver) => {
    setEditingId(driver.id);
    setEditForm({
      id: driver.id, name: driver.name, username: driver.username, mobile: driver.mobile,
      vehicle: driver.vehicle, vehicleNumber: driver.vehicleNumber, status: driver.status,
      location: driver.location, availability: driver.availability, newPassword: '',
    });
    setMessage('');
  };

  const saveEdit = () => {
    if (!editForm) return;
    if (!editForm.name.trim() || !editForm.username.trim() || !editForm.mobile.trim() || !editForm.vehicleNumber.trim()) {
      setMessage('Please complete all required driver details.'); return;
    }
    if (!/^\d{10}$/.test(editForm.mobile.trim())) { setMessage('Please enter a valid 10-digit mobile number.'); return; }
    if (drivers.some((driver) => driver.id !== editForm.id && driver.username.toLowerCase() === editForm.username.trim().toLowerCase())) {
      setMessage('That username is already used. Please choose another username.'); return;
    }

    const next = drivers.map((driver) => driver.id === editForm.id ? {
      ...driver,
      name: editForm.name.trim(), username: editForm.username.trim(), mobile: editForm.mobile.trim(),
      vehicle: editForm.vehicle, vehicleNumber: editForm.vehicleNumber.trim().toUpperCase(),
      status: editForm.status, location: editForm.location, availability: editForm.availability,
      password: editForm.newPassword ? editForm.newPassword : driver.password,
    } : driver);
    persist(next);
    setMessage(`Driver ${editForm.name.trim()} updated.`);
    setEditingId(null); setEditForm(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-black p-7 text-white shadow-xl md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Admin Control</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Driver Management</h1>
          <p className="mt-3 max-w-2xl text-gray-300">Admin creates driver login access, tracks position and controls driver availability.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Create Driver</p>
            <h2 className="mt-1 text-2xl font-black">Driver Login & Vehicle Details</h2>
            <p className="mt-2 text-sm text-gray-500">Next Driver ID: {nextDriverId}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label><span className="mb-2 block text-sm font-bold">Driver Name *</span><input value={form.name} onChange={(e)=>updateField('name',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" /></label>
              <label><span className="mb-2 block text-sm font-bold">Mobile Number *</span><input value={form.mobile} onChange={(e)=>updateField('mobile',e.target.value.replace(/\D/g,'').slice(0,10))} inputMode="numeric" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" /></label>
              <label><span className="mb-2 block text-sm font-bold">Username *</span><input value={form.username} onChange={(e)=>updateField('username',e.target.value)} autoCapitalize="none" className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" /></label>
              <label><span className="mb-2 block text-sm font-bold">Password *</span><input type="password" value={form.password} onChange={(e)=>updateField('password',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3" /></label>
              <label><span className="mb-2 block text-sm font-bold">Vehicle *</span><select value={form.vehicle} onChange={(e)=>updateField('vehicle',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">{FLEET_DATA.map((v)=><option key={v.id} value={v.name}>{v.name}</option>)}</select></label>
              <label><span className="mb-2 block text-sm font-bold">Vehicle Number *</span><input value={form.vehicleNumber} onChange={(e)=>updateField('vehicleNumber',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase" /></label>
              <label><span className="mb-2 block text-sm font-bold">Current Location</span><select value={form.location} onChange={(e)=>updateField('location',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">{Object.entries(locationLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
              <label><span className="mb-2 block text-sm font-bold">Availability</span><select value={form.availability} onChange={(e)=>updateField('availability',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">{Object.entries(availabilityLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
              <label className="md:col-span-2"><span className="mb-2 block text-sm font-bold">Driver Access Status</span><select value={form.status} onChange={(e)=>updateField('status',e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"><option value="active">Active</option><option value="disabled">Disabled</option></select></label>
            </div>

            {message && <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold">{message}</div>}
            <button className="mt-6 w-full rounded-2xl bg-yellow-400 px-6 py-4 text-lg font-black text-black">Create Driver</button>
            <p className="mt-4 text-xs text-gray-400">Preview only: credentials are stored locally in this browser for login testing. Production will use a secure backend.</p>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
            <div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-gray-400">Driver Access</p><h2 className="mt-1 text-2xl font-black">Created Drivers</h2></div><div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold">{drivers.length} {drivers.length===1?'driver':'drivers'}</div></div>

            {drivers.length===0 ? <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-12 text-center"><div className="text-4xl">🚕</div><p className="mt-4 font-bold">No drivers created yet</p></div> : (
              <div className="mt-6 space-y-4">{drivers.map((driver)=><div key={driver.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                <div className="flex items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-black">{driver.name}</h3><span className={`rounded-full px-3 py-1 text-xs font-bold ${driver.status==='active'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{driver.status==='active'?'Active':'Disabled'}</span><span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">{availabilityLabels[driver.availability]}</span></div><p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">{driver.id}</p></div><div className="flex gap-2"><button type="button" onClick={()=>startEdit(driver)} className="rounded-xl bg-yellow-400 px-3 py-2 text-xs font-black">Edit</button><button type="button" onClick={()=>toggleStatus(driver.id)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold">{driver.status==='active'?'Disable':'Enable'}</button></div></div>

                <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4"><div className="text-xs font-bold uppercase text-yellow-700">Current Driver Position</div><div className="mt-1 text-lg font-black">📍 {locationLabels[driver.location]}</div></div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div className="rounded-2xl bg-white p-3"><div className="text-xs font-bold uppercase text-gray-400">Username</div><div className="mt-1 font-semibold">{driver.username}</div></div><div className="rounded-2xl bg-white p-3"><div className="text-xs font-bold uppercase text-gray-400">Mobile</div><div className="mt-1 font-semibold">{driver.mobile}</div></div><div className="rounded-2xl bg-white p-3"><div className="text-xs font-bold uppercase text-gray-400">Vehicle</div><div className="mt-1 font-semibold">{driver.vehicle}</div></div><div className="rounded-2xl bg-white p-3"><div className="text-xs font-bold uppercase text-gray-400">Vehicle No.</div><div className="mt-1 font-semibold">{driver.vehicleNumber}</div></div></div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2"><select value={driver.location} onChange={(e)=>updateLocation(driver.id,e.target.value as DriverLocation)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold">{Object.entries(locationLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select><select value={driver.availability} onChange={(e)=>updateAvailability(driver.id,e.target.value as AvailabilityStatus)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold">{Object.entries(availabilityLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>
                <div className="mt-4 rounded-2xl bg-black px-4 py-3 text-sm text-white">Booking access: <span className="font-bold text-yellow-400">Admin-assigned trips only</span></div>

                {editingId===driver.id && editForm && <div className="mt-4 rounded-3xl border border-yellow-200 bg-white p-4"><h4 className="font-black">Edit Driver</h4><div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input value={editForm.name} onChange={(e)=>setEditForm({...editForm,name:e.target.value})} className="rounded-xl border px-3 py-2" placeholder="Driver name" />
                  <input value={editForm.mobile} onChange={(e)=>setEditForm({...editForm,mobile:e.target.value.replace(/\D/g,'').slice(0,10)})} className="rounded-xl border px-3 py-2" placeholder="Mobile" />
                  <input value={editForm.username} onChange={(e)=>setEditForm({...editForm,username:e.target.value})} className="rounded-xl border px-3 py-2" placeholder="Username" />
                  <input type="password" value={editForm.newPassword} onChange={(e)=>setEditForm({...editForm,newPassword:e.target.value})} className="rounded-xl border px-3 py-2" placeholder="New password (optional)" />
                  <select value={editForm.vehicle} onChange={(e)=>setEditForm({...editForm,vehicle:e.target.value})} className="rounded-xl border px-3 py-2">{FLEET_DATA.map((v)=><option key={v.id} value={v.name}>{v.name}</option>)}</select>
                  <input value={editForm.vehicleNumber} onChange={(e)=>setEditForm({...editForm,vehicleNumber:e.target.value})} className="rounded-xl border px-3 py-2 uppercase" placeholder="Vehicle number" />
                  <select value={editForm.location} onChange={(e)=>setEditForm({...editForm,location:e.target.value as DriverLocation})} className="rounded-xl border px-3 py-2">{Object.entries(locationLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
                  <select value={editForm.availability} onChange={(e)=>setEditForm({...editForm,availability:e.target.value as AvailabilityStatus})} className="rounded-xl border px-3 py-2">{Object.entries(availabilityLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
                  <select value={editForm.status} onChange={(e)=>setEditForm({...editForm,status:e.target.value as DriverStatus})} className="rounded-xl border px-3 py-2 sm:col-span-2"><option value="active">Active</option><option value="disabled">Disabled</option></select>
                </div><div className="mt-4 flex gap-3"><button type="button" onClick={saveEdit} className="flex-1 rounded-xl bg-yellow-400 px-4 py-3 font-black">Save Changes</button><button type="button" onClick={()=>{setEditingId(null);setEditForm(null)}} className="rounded-xl border px-4 py-3 font-bold">Cancel</button></div></div>}
              </div>)}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDrivers;
