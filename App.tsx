import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppEntry from "./src/AppEntry";
import { QueryClient, QueryClientProvider } from "react-query";
import { NativeBaseProvider } from "native-base";


const queryClient = new QueryClient()
const App :React.FC = () => {

     return (
          <QueryClientProvider client={queryClient}>
               <NativeBaseProvider>
                    <NavigationContainer>
                         <AppEntry/>
                    </NavigationContainer>
               </NativeBaseProvider>
          </QueryClientProvider>
     );
};

export default App;
