# mvp-match-test

## Notes from the developer (me)

### Project summary and general comments
- This challenge was really long and involved a lot of different concepts, so in the middle of the test I decided to cut short on some of the expected functionalities to implement. This project is currently incomplete, but I have spent about 8-10 hours already, which is far more than the "estimate" provided in the challenge description.
- Tech stack used was Vue3 (composition API), SCSS, Quasar for UI, Cypress for testing and Axios to handle API requests. I had to cut some functionalities so I decided not to implement unit tests with VTL/Jest because there was already *some* testing implemented, though ideally I'd aim for a much higher coverage and test completeness.
- I tried to make a responsive-ish application, but it wasn't the main focus at all, so I'd say the app is functional in mobile/tablet devices, although the design can be improved substantially. In general I didn't want to spend too much time into design, because I think it's not the main point of a tech challenge like this one.


### Application flow
- When starting the project, both `/projects` and `/gateways` endpoints are called, and the data they return is parsed and stored in App.vue, and later passed to the button dock component and the chart layout component.
- The button dock component has the project/gateway selectors, the date pickers and the generate report button.
  - The selectors are multi-select and all contain a default "no-filter" option ("All projects"/"All gateways"). Clicking on that option will cancel all other selected values, and it's not possible to have no option selected at all (attempting to do so will re-select the no-filter option).
  - The date pickers are pretty standard, and you can't select a "to" date that's earlier than the "from" date.
  - The generate report button will pick the info provided in the other 4 buttons, perform a POST request to `/report`, and the data returned will be parsed and emitted back to App.vue.
- Whenever a report data is available, the Chart Layout component will be created.
  - The report data will be aggregated and grouped. I didn't have time to make the grouping dynamic based on the user input, so I had to hardcode grouping by project.
  - On the left part of the layout, a section summary will appear for each group, containing the group ("Project X", since I hardcoded always grouping by project) and the total amount for all transactions in that group (with hardcoded USD as currency, I had no idea which was the actual currency and it would get out of scope to make currency conversions anyway).
  - Clicking on a section will toggle the display of a table containing all the individual transactions belonging to that group. The table is sortable and has pagination.
  - On the left part of the layout, a donut chart will appear, containing a simple yet nice visual representation of the aggregate data.

### Things I know are missing, and why
  - No unit testing. I did some e2e/regression tests, I know this may be a dealbreaker for some companies but I really have spent a large amount of time on this project. This is the next thing I'd do with more time.
  - A second layout, the one that doesn't contain a graph. This was very similar to the one with the graph (except, it doesn't have a graph :D) so I decided to go with the most complete layout because I had to pick 1 for time reasons.
  - Vuex, not strictly necessary for an application as small as this one but I think it would have been cleaner to have the centralized state, mainly to handle the projects & gateways info.
  - The data from the report is configured to always be grouped by project; I would have liked to make this dynamic but it would take quite some effort and I think the hardcoding was enough to show I know how to handle the data.
  - The Cypress tests are somewhat basic, I tried to make wide coverage although somewhat superficial. More test cases probably should be done, like error states and such.
  - Typescript support, I felt it wasn't really necessary to showcase Typescript for this project and I don't even know if you are using it, so I decided to go for the "easier" route.
  - Some parts of the code are certainly somewhat dirty, a good thorough refactor is probably needed, although I tried to create a reasonable folder structure from the beginning and keep code style consistency and good practices like responsibility isolation, code segregation, etc. But in the end this application, even if not super complex, was complex enough that I sadly couldn't spend as much time as I would've liked thinking about how to structure better the code. In my opinion the codebase in general is "good enough", but of course there are a ton of little things that could be changed.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
