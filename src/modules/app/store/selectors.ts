import { createSelector } from "reselect";
import { selectRootState } from "../../../store/selectors";


export const selectWalletAddress = createSelector(
    [selectRootState],
    state => state.app.walletAddress,
)