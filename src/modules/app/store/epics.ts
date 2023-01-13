import { filter, switchMap } from "rxjs";
import { isActionOf } from "typesafe-actions";
import { RootEpic } from "../../../store/epics";
import { setWalletAddress } from "./actions";



const baseEpic: RootEpic = action$ =>
    action$.pipe(
        filter(isActionOf(setWalletAddress)),
        switchMap(() => {
            return [];
        })
    )

const appEpics = [
    baseEpic,
];

export default appEpics;