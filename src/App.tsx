import { Suspense } from 'preact/compat'
import { Switch, Route} from 'wouter-preact';
import Header from 'components/Header'
import Feed from 'pages/feed'
import Storie from 'pages/storie'

export default function () {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<p>Loading...</p>}>
        <Header />
        <Switch>
           <Route path="/" component={Feed} />
           <Route path="/:id" component={Storie} />
        </Switch>
      </Suspense>
    </div>
  )
}


