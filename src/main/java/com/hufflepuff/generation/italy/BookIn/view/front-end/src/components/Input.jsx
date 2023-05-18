import cn from 'classnames';
import { useState } from 'react';

export default function Input({ label, name, type, placeholder }) {
    const [message, setMessage] = useState("");
    const [indicatorColor, setIndicatorColor] = useState("primary");
    let inputClasses = "input input-bordered shadow-inner w-full max-w-xs";
    
    const validation = (e) => {
        const input = e.target.value;

        /* validazione isbn
        if (name == "isbn") {
            input
        } */

        if (input == "") {
            switch (name) {
                case "title":
                    setIndicatorColor("primary");
                    setMessage("Il titolo non può essere nullo!");
                    break;
                case "author":
                    setIndicatorColor("primary");
                    setMessage("Non dimenticare l'autore!");
                    break;
                case "language":
                    setIndicatorColor("secondary");
                    setMessage("Non dimenticare l'autore!");
                    break;
                case "isbn":
                    setIndicatorColor("primary");
                    setMessage("No ISBN, No cover!");
                    break;
            }
        } else {
            setMessage("");
        }

    }
    
    return (
    <div className="form-control w-full max-w-xs indicator">
            <label className="label">
              <span className="text-lg">{label}</span>
            </label>
            {message != "" ? <span className={`indicator-item indicator-middle indicator-end badge badge-${indicatorColor}`} >{message}</span> : null}
            <input onChange={validation} name={name} type={type} placeholder={placeholder} className={inputClasses} />
          </div>
    )
} 