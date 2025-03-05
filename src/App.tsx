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
        <Switch >
           {/* /hacker-news-client/ this line is necessary for the correct operation of the project on the github page */}
           <Route path="/hacker-news-client/" component={Feed} />
           <Route path="/hacker-news-client/:id" component={Storie} />
        </Switch>
      </Suspense>
    </div>
  )
}


