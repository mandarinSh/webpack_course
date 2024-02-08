import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import classes from '@/components/App/App.module.css';
import SvgPic from '@/assets/Short.svg';

function TODO() {
  TODO2();
}

function TODO2() {
  throw new Error();
}

export const App = () => { 
  const [count, setCount] = useState<number>(0);
  // const inc = () => setCount(prev => prev + 1);
  const inc = () => TODO();

  // if (__PLATFORM__ === 'desktop') {
  //   return <div>ISDesktopPlatform</div>
  // }

  // if (__PLATFORM__ === 'mobile') {
  //   return <div>ISMobilePlatform</div>
  // }

  // TODO();

  return (
    <div data-testid={"App.DataTestId"}>
      <h1 data-testid={"Platform.DataTestId"}>
        PLATFORM={__PLATFORM__}
      </h1>
      <div>
        <SvgPic width={100} height={100} />
      </div>
      <Link to={'/about'}>about</Link>
      <br/>
      <Link to={'/shop'}>shop</Link>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={inc}>click to increment</button>
      <Outlet/>
    </div>
  )
}