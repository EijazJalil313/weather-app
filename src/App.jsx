import Dashboard from "@/page/Dashboard";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}
