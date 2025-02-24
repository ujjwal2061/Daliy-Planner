

const APIKEY=import.meta.env.VITE_GEMINI_APIKEY;
const   GEMINILINK=import.meta.env.VITE_GEMIN_LINK;

export const getOpenaiSummary=async(todos ,shortTermtodos,longtermtodos)=>{
    try{
        const prompt=`
           Analyze these goals and provide a management strategy with this exact structure:

          **All Golas**
          ${JSON.stringify(todos)}
          
          **Short-Term-Goals(0-3 months)**
           ${JSON.stringify(shortTermtodos)}

           **Long-Term-Goals(6+ months)**
            ${JSON.stringify(longtermtodos)}
  ## Management Strategy: [Overall Theme]
  [Brief overview paragraph]
  
  **1. Quick Wins**
  - [Action 1]
  - [Action 2]
  
  **2. Foundation Builders**
  - [Action 1]
  - [Action 2]
  
  **3. Long-Term Success**
  - [Action 1]
  - [Action 2]
  
  **4. Potential Pitfalls**
  - [Risk 1]
  - [Risk 2]
    Use bold headers for sections and bullet points for actions. Avoid markdown except for **bold**.
    Sources  for the Study materails give the some resources For the Study Plane
    `;
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
        return data.candidates[0].content.parts[0].text;
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