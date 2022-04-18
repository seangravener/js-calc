Goal: 
single direction, reactive state flow

- "store" object as singleton?

building custom store!
https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/

```
/**
 * Finite State Machine Specs:
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] One state is defined as the initial state. When a machine starts to execute, it automatically enters this state.
 * [x] Each state can define actions that occur when a machine enters or exits that state. Actions will typically have side effects.
 * [x] Each state can define events that trigger a transition.
 * [x] A transition defines how a machine would react to the event, by exiting one state and entering another state.
 * [x] A transition can define actions that occur when the transition happens. Actions will typically have side effects.
 *
 * Inspired by
 * https://statecharts.dev/what-is-a-state-machine.html
 * https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript
 */
```

## Other Reading
>> For me, using a state machine means asking the right questions. This approach simply leads to higher level of predictability. We see how the state machine pattern protects our app being in a wrong state or state that we don’t know about. There is no conditional logic in the view layer because the machine is capable of providing information of what should be rendered.
https://krasimirtsonev.com/blog/article/getting-from-redux-to-state-machine-with-stent

