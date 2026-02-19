
import { SearchResponse } from "../types";
import { PREDEFINED_ANSWERS } from "../constants";

export async function askTravelAssistant(query: string): Promise<SearchResponse> {
  const lowercaseQuery = query.toLowerCase();
  
  // Find the best matching predefined answer
  const match = PREDEFINED_ANSWERS.find(item => 
    item.keywords.some(keyword => lowercaseQuery.includes(keyword))
  );

  // Simulate a small delay for better UX
  await new Promise(resolve => setTimeout(resolve, 600));

  if (match) {
    return {
      answer: match.answer
    };
  }

  // Default response if no keywords match
  return {
    answer: "I'm not sure about that specific detail. For accurate information regarding taxi services, fares, or travel routes from Markapur to Srisailam, please call us directly at 91-9491320241. We're happy to help!"
  };
}
