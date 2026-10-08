// export async function register(): Promise<void> {
//   if (process.env.NEXT_RUNTIME === "nodejs") {
//     const dns = await import("node:dns");

//     dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

//     console.log(
//       "[Instrumentation] DNS servers set to Google DNS successfully"
//     );
//   }
// }