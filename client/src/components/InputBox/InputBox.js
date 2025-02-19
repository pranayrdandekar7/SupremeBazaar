import React from 'react'

const InputBox = ({ label, val, onChange, placeholder = "", type = "text" }) => {
    return (
        <div>
            <form>
            <label htmlFor={label}>{label} :</label>
            <input
                type={type}
                placeholder={placeholder}
                id={label}
                className="px-2 py-1 border border-gray-300 rounded-md w-full focus:outline-none mb-4 text-md"
                value={val}
                onChange={(e) => onChange(e.target.value)}
            />
            </form>
        </div>

    )
}

export default InputBox;