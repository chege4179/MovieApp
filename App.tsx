import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppEntry from "./src/AppEntry";

const App :React.FC = () => {

     return (
          <NavigationContainer>
               <AppEntry/>
          </NavigationContainer>

     );
};

export default App;
