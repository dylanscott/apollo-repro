# Apollo Repro

This repository contains a minimal reproduction of [`apollographql/apollo-client#1186`](https://github.com/apollographql/apollo-client/issues/1186).

## How to Repro

Start the app by running `yarn start` and then navigate to http://localhost:3000

You will be presented with a very simple app with buttons to select "evens" or "odds", which controls which list is loaded from a GraphQL endpoint to be displayed. We use `pollInterval` to re-run requests every 4 seconds, and the server introduces an artificial delay of 2 seconds to each request, so a polling request should be in flight half of the time.

Open the network tab and monitor `/graphql` requests. Two will be fired at a time (the reason for this is explained in the "Details" section below). If you change your "evens"/"odds" selection while the polling requests are in-flight, the container will get stuck in the loading state. Inspecing its `data` prop in the React DevTools reveals that its `data.networkStatus` value is stuck at `6` aka [`NetworkStatus.poll`](https://github.com/apollographql/apollo-client/blob/master/src/queries/networkStatus.ts#L35) which means that a polling request is in flight. This despite the fact that the polling request has finished, and subsequent ones even fire and complete without updating the component. If you change "evens"/"odds" while a request is not in flight, it will work and will even recover the app from the stuck state.

## Details

This issue seems to be caused by some interaction between polling, having multiple copies of the same GraphQL container component rendered on the page at a time, and triggering a re-render on the components while poll requests are in flight.

In order to reproduce this, the app is structured in a somewhat weird way. In particular, the [`List`](https://github.com/dylanscott/apollo-repro/blob/master/src/List.js) component is [rendered twice](https://github.com/dylanscott/apollo-repro/blob/master/src/App.js#L33), regardless of your selection, but conditionally hidden based on selection. This issue does not reproduce if you remove the `className` props passed to the `List` component, which seems to suggest that this issue is triggered by something after [this](https://github.com/apollographql/react-apollo/blob/master/src/graphql.tsx#L222) prop check in the react-apollo wrapper component.