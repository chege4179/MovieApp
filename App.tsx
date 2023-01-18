import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppEntry from "./src/AppEntry";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient()
const App :React.FC = () => {

     return (
          <QueryClientProvider client={queryClient}>
               <NavigationContainer>
                    <AppEntry/>
               </NavigationContainer>
          </QueryClientProvider>
     );
};

export default App;
