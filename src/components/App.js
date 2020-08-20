import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Head from './Head';
import Filters from './Filters';

import appStyles from './styles/app.module.scss';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'home' */ './Home'),
  loading: () => <div>Loading...</div>
});

const App = () => (
  <div className={appStyles.appContainer}>
    <Head />
    <main className={appStyles.appSpace}>
      <h2 className={appStyles.title}>SpacEx Lanch Programs</h2>

      <div className={appStyles.row}>
        <div className={appStyles.leftColumn}>
          <Filters />
        </div>
        <div className={appStyles.rightColumn}>
          <Switch>
            <Route exact path="/" component={LoadableHome} />
            <Route path="/:filterStr" component={LoadableHome} />
          </Switch>
        </div>
      </div>
    </main>
    <footer className={appStyles.footer}>
      <h3 className={appStyles.footerText}> Developed By:</h3>
      <h3 className={appStyles.footerText}> Ranjitha</h3>
    </footer>
  </div>
);

export default App;
