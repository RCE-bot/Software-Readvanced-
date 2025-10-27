import {toast} from "sonner";

// test api calls
class Test
{
  public constructor()
  {
      // api call "api/test" calls api to see if api calls work on client (used for debugging)
        this.test();
  }

  private async test():Promise<void>
  {
      fetch("/api/test") //fetch route
          .then((res):Promise<any> => res.json()) //request json data
          .then((data) => {
              // if data received, display success message
          console.log("✅ React frontend connected to Flask backend!");
          console.log("Backend message:", data.message);
          toast.success("Server connected to client!");
      }).catch((err):void => { // error handling (arrow function
          // display this if unable to fetch json from api
          console.error("❌ Could not connect to backend", err);
          toast.error("Failed to connected server to client -_-");
      });
  }
}
export default Test; // export class for rendering in app.tsx