import * as React from "react";



type BadgeProps =  React.HTMLAttributes<HTMLSpanElement>;

const Badge: React.FC<BadgeProps> = ({className, ...props}) => {
    return (
        <span  className={"bg-badgeColor text-center text-[14px] min-w-[100px] inline-block font-bold rounded-3xl text-black  px-[14px] text-badgeTextColor py-[14px] " + className } {...props} />
    )
}

export default Badge;