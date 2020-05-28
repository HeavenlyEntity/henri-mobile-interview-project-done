# Henri Mobile Interview Project

Thank you for taking the time to complete this project and considering joining our team.

The intention for this project is to get a good baseline of your React Native and JavaScript skills.

We expect the project to take anywhere from 2-5 hours depending on experience. Feel free to dedicate what you want - but it shouldn't feel like a burden.

Overall we will be evaluating the entire package: UI design, code quality, and architecture. Aim to be well rounded instead of perfection in a single area. If you find yourself far exceeding the time constraints, then consider reducing the quality.

## Summary

The project will consist of three tabs:

1. Users - list of users with their pertinent information
2. Feed - list of posts and comments, ability to create and delete a post
3. Todos - list of todos, ability to mark as complete/incomplete

We highly recommend using the most modern practices such as React Hooks/functional components.

## Tools Used

- React Native – Framework for building mobile apps: https://facebook.github.io/react-native/
- React Navigation – Routing for React Native apps: https://reactnavigation.org/
- Redux – Javascript state management: https://redux.js.org/
- React Native Vector Icons - Customizable Icons: https://github.com/oblador/react-native-vector-icons
- Axios – HTTP client: https://www.npmjs.com/package/axios
- JSONPlaceholder - Fake Online REST API: https://jsonplaceholder.typicode.com
- UIFaces - Avatars for design mockups: https://uifaces.co

## Tab Descriptions

### Users

The Users tab should display a list of users along with other info such as email, phone, company, etc (use your discretion).

The Users will be retrieved from JSONPlaceholder (mentioned above).

JSONPlaceholder does not provide avatar images.

It is recommended to show user avatars by using UIFaces (please set up an API key) and populate users from JSONPlaceholder.

The users should be fetched in the component/screen itself and dispatched to Redux.

The reason users should be in Redux is so they can be retrieved in other parts of the application (Feed tab).

### Feed

The Feed tab will be the most complex in the project.

It should display a list of posts from JSONPlaceholder and the posts should also show their respective comments (separate endpoint from JSONPlaceholder).

The posts should be populated with the corresponding user from the Users reducer. It would be wise to display information such as name and avatar of the user making the post.

Comments do not have user info but there should be some indication as to who it was from (provided in the comment object).

Posts/comments should be fetched by dispatching a redux action (the API call should be in the actions file).

Posts should have the ability to be deleted by dispatching a redux action (use JSONPlaceholder DELETE endpoint).

In addition, there should be a way to create a new post. The new post should have a title and body as the rest do. You must use the fake API endpoint with JSONPlaceholder to complete a POST request, although no data will actually be saved.

Once the post is made, it should be visible on the client. A user should be assigned to the post.

### Todos

The Todos tab will be the easiest of them all.

Simply use local state to fetch todos from JSONPlaceholder.

Display the todos and with an indication on whether they have been completed or not.

Allow for todos to be marked as complete/incomplete using React Hooks/local state.

## Getting Started

Clone the repo, run `npm install`, and begin scaffolding the app. If you need to set up React Native, please follow the guide here: https://facebook.github.io/react-native/docs/getting-started.html. Do NOT use "Expo CLI Quickstart" - use "React Native CLI Quickstart."

You'll especially want to consider your redux, router, and screens architecture.

We recommend using a bottom tab navigator from React Navigation (https://reactnavigation.org/docs/en/bottom-tab-navigator.html).

Then begin building out the individual tabs as discussed above.

There is an app-sample.png photo in the root of the repo. It's just meant to provide something visual - don't feel the need to follow it.

## Upon Completion

When completed, create a GitHub repo and send to projects@henrihome.com with your name/info.

## Contact

We are here to answer any questions throughout the process, especially if something is not clear or doesn't make sense.

You can reach us at projects@henrihome.com.