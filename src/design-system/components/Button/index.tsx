import * as React from "react";



interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    color?: 'primary' | 'secondary';
}



const Button: React.FC<ButtonProps> = ({className, color = 'primary', ...props}) => {

    const classes = `bg-${color} text-[14px] text-center font-bold rounded-md px-[14px] min-w-[100px] text-${color === 'primary' ? 'white' : 'black'} h-[54px] border-0 border-primary hover:border disabled:bg-slate-700 ` + className;
    return (
        <button className={classes} {...props} />
    )
}

export default Button;