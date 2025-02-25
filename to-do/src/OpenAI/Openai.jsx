

const APIKEY=import.meta.env.VITE_GEMINI_APIKEY;
const   GEMINILINK=import.meta.env.VITE_GEMIN_LINK;

export const getOpenaiSummary=async(todos ,shortTermtodos,longtermtodos)=>{
    try{
        let  prompt=" First Analyze the golas and Provide the Simple And nice Strategy with Good Structure Manner:";
         if(todos.length > 0){
          prompt+=`**All Golas**
          ${JSON.stringify(todos)}
          `
         }  
         if(shortTermtodos.length > 0){
          prompt+=`**Short-TermGoals (0-3 months) give simple guid for the short term goals **
          ${JSON.stringify(shortTermtodos)}\n\n;
          `
         }  
          
        if(longtermtodos.length > 0){
          prompt += `**Long-Term Goals (6+ months)**\n${JSON.stringify(longtermtodos)}\n\n`;
        }
        
        
        prompt += `## Management Strategy: [Overall Theme]\n[Brief overview paragraph]\n\n`;

        if (shortTermtodos.length > 0) {
            prompt += `**1. Quick Wins**\n- [Action 1] Simple guide for the task in three or four lines.\n\n`;
        }
        if (todos.length > 0 || shortTermtodos.length > 0) {
            prompt += `**2. Foundation Builders**\n- [Action 1]\n\n`;
        }
        if (longtermtodos.length > 0) {
            prompt += `**3. Long-Term Success**\n- [Action 1]\n\n`;
        } 
    ; 
    prompt += `Use bold headers for sections and bullet points for actions.
       Avoid markdown except for **bold**.\n
       Provide study resources and additional guidance where needed. 
       Also Give the Sources for the for the Study Material and  
       Format links as follows: Resource Name:(https://example.com).\n
       Write somthing to  Motivate  theme`
      
       ;
       // Gemini API call
    const response = await fetch(`${GEMINILINK}?key=${APIKEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ 
              text: prompt 
            }]
          }]
        })
      }); 
      
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
        const data = await response.json();
        const result= data.candidates[0].content.parts[0].text;
        
        return result
    }catch(error){
        console.error('Error generating summary:', error.response ? error.response.data : error.message);
        throw error;
    }

} 
export const chatwithsummary=async (userinput ,summary)=>{
  try{

 const prompt=`
   ${summary}
    # Make the better summary from the Previous Summary given #
    ** Try to give simple and Easy Summary so user can feel Easy to achevie it ** 
   ${JSON.stringify(userinput)}
   ** Look at the user input then gice then accoeding to the need provide mor sources for the Study Materials and Money Svinf and Other what user input **
  
   
 `
 const response=await fetch(`${GEMINILINK}?key=${APIKEY}`,{
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ 
        text: prompt 
      }]
    }]
  })
}); 
if (!response.ok) {
  throw new Error(`API Error: ${response.status} ${response.statusText}`);
}
const data = await response.json();
 return data.candidates[0].content.parts[0].text;
  }catch(error){
    throw error
  }

}