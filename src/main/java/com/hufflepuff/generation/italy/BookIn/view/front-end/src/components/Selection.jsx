export default function Selection({ thingsToShow, onChange }){
   return(
      <div onChange={onChange} className="grid grid-cols-2 gap-2">
            {
            thingsToShow.map((thing) => (
               <div key={thing.id} className="form-control">
                  <label htmlFor={thing.name} className="cursor-pointer label">
                     <span className="label-text">{thing.name}</span>
                     <input type="checkbox" className="checkbox checkbox-accent" name={thing.name} value={thing.name} />
                  </label>
               </div>   
            ))
            }
      </div>
   );
}