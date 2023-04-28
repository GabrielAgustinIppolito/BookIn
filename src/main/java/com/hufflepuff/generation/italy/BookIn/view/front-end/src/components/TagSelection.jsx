export default function TagSelection({ tagsToShow, onChange }){
   return(
      <div onChange={onChange}>
            {
            tagsToShow.map((tag) => (
               <div key={tag.id}>
                  <label htmlFor={tag.name}>{tag.name}</label>
                  <input type="checkbox" name={tag.name} value={tag.name}/>
               </div>        
            ))
            }
      </div>
   );
}