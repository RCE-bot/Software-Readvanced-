import {toast} from "sonner";
// test api calls
export default class Test
{
  /*
   using class to test api for debug
   also using this to test OOP in typescript
   */
  public constructor()
  {
      // api call "api/test" calls api to see if api calls work on client (used for debugging)
        this.test();
  }
  private async test():Promise<void>
  {
      try
      {
          fetch("http://127.0.0.1:5000/api/test") //fetch route
              .then((res:Response):Promise<any> => res.json()) //request json data
              .then((data:any):void =>
              {
                  // if data received, display success message
                  console.log("[SUCCESS] React frontend connected to Flask backend!");
                  console.log(`Backend message: ${data.message}`);
                  toast.success(`connected to backend server`);
              }).catch((err:any):void =>
          { // error handling (arrow function
              // display this if unable to fetch json from api
              console.error("[FAIL] Could not connect to backend", err);
              toast.error("Failed to connected server to client -_-");
              
          });
      }
      catch (error:any)
      {
          toast.error(`Failed to send payload to api ${error}`);
      }
   }
};

