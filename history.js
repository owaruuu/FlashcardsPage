function ReplaceState(state){
    window.history.replaceState(state, null, "");
}
function PushHistoryState(state){
    window.history.pushState(state, null, "");
}

export { ReplaceState, PushHistoryState };
export const name = "history";