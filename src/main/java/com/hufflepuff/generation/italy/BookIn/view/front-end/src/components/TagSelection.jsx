

export default function TagSelection({tagsToShow}){
   return(
      <div>
            {
            tagsToShow.map((tag) => (
               <div key={tag.id}>
                  <label htmlFor={tag.name}>{tag.name}</label>
                  <input type="checkbox" name={tag.name} />
               </div>           
            ))
            }
      </div>
   );
}