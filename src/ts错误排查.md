在定义reducer 时，使用类型Reducer<appState,appAction>
  ```typescript

  export const course: Reducer<CourseState, CourseAction> = (state = init_state, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {

  }
  return state

  /*
  Type '(state: CourseState | undefined, action: CourseAction) => CourseState | undefined' is not assignable to type 'Reducer<CourseState, CourseAction>'.
  Type 'CourseState | undefined' is not assignable to type 'CourseState'.
    Type 'undefined' is not assignable to type 'CourseState'.  TS2322

  */
}
  ```
  - 错误原因是类型不匹配，类型Reducer接收的两个参数中的第一个 `reducerState` 是联合类型,
    可以是reducerState或者是 undefined 
  - 猜想：因为我只是定义了一个结构，没有赋初始值给reducerState,所以会报错
  - 解决 在定义reducer函数时，类型Reducer的第一个参数赋值为 `reducerState | undefined`

  ```typescript
  
   const course: Reducer<CourseState | undefined, CourseAction> = (state,action) => {
     // ...
   }

  ```