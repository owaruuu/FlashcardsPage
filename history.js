function ReplaceState(state){
    window.history.replaceState(state, null, "");
}
function PushHistoryState(state){
    window.history.pushState(state, null, "");
}

// export function Render(state){
//     switch (state.currentPage) {
//         case "home":
//             ReloadPage();
//             break;
//         case "lectureList":
//             FlashSetButton(state.lastLecture);
//             break;
//         case "lectureFlash":
//             console.log("lecture Flash");
//             break;
//         default:
//             break;
//     }
// }

export { ReplaceState, PushHistoryState };
export const name = "history";