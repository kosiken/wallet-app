import React from 'react'

const BulletPoint: React.FC<{active?: boolean}> = ({active = false}) => {
    const classes = 'inline-flex justify-center items-center w-[40px] h-[40px]  rounded-full ' + (active ? 'bg-lightColor' : 'bg-transparent')
  return (
    <div className={classes}>
        <div className="bg-primary w-[20px]  h-[20px] rounded-full " />
    </div>
  )
}

export default BulletPoint;
