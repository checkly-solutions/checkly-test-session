## Playwright Test: Fetch Test Session Results
### Test Session API Workaround

This Playwright test script logs into the Checkly app, blocks third-party resources, and retrieves test session data for specific time ranges. It processes the test results and downloads trace files for browser-based checks.

### Key Features
- **Block Third-Party Resources:** Utilizes a utility function to block specified third-party URLs during the test. Making sure you don't get blocked in test execution.
- **Login and Auth Token Handling:** Logs into Checkly and listens for the login API response to extract an authorization token.
- **Fetch Test Sessions:** Retrieves test session IDs within a specified time range and processes the results.
- **Download Trace Files:** For each browser test session result within a retrieved Test Session, we download the trace file directly and saves it with a custom filename related to the test name+testSessionId+testSessionResultId,

### Setup

1. **Dependencies:**
   - Playwright installed with: `npm install @playwright/test`
   - Required imports and utilities from your project:
     - `block3rdPartyResources`: Function to block third-party URLs.
     - `checklyLogin`: Function to handle Checkly login.
     - `fetchTestSessions`: Function to fetch test sessions within a time range.
     - Path management via Node.js (`path` module).

2. **Constants:**
   - `accountUUID`: The account identifier.
   - `thirdPartyUrls`: List of third-party URLs to block.
   - `initialUrl`: URL used to initialize the Playwright session.

3. **Environment variables:**
   - You will need to add a service user of some kind to that can login to your Checkly account and execute the script. 
   - `SERVICE_USER`: Email of service user with access to account.
   - `SERVICE_PASS`: Service user password for accessing Checkly.
   - `ACCOUNT_UUID`: Account UUID of the account you're interested in having ability to run this script


### How It Works

1. **Block Resources:**
   - The `block3rdPartyResources` function prevents third-party URLs from loading during navigation.
   
2. **Login & Auth Token:**
   - The script listens for the `/oauth/token` API call and extracts the `authToken`, which is used for subsequent API requests.

3. **Fetch Test Sessions:**
   - It calls the `fetchTestSessions` function with the account UUID, auth token, and the desired time range to retrieve test session IDs.
   
4. **Process Test Results:**
   - For each session, the script waits for the API response, processes results with `BROWSER` check types, and downloads trace files, saving them with custom filenames that include session and result IDs.
   
5. **Download & Save Trace Files:**
   - For each browser-based result, the script downloads Playwright traces and renames the files with session-specific information.

### Example Execution

To run the script, use the following Playwright command:

```bash
npx playwright test --timeout=90000
```

Make sure to adjust any URLs, paths, or token key names as necessary for your environment.

### File Download Management

Downloaded traces are saved in the `downloads` directory with filenames formatted as:
```
<original_filename>-testSessionId-<testSessionId>-testSessionResultId-<testSessionResultId>.zip
```

You can further process or unzip the downloaded traces if required.

^^^

### Considerations

   - Handling the startTime & endTime dynamically is a priority, if you want this running on a schedule you have to update that variable dynamically and control for currently running test sessions
   - You may have to do some form of filtering / sampling versus gathering all results as this may become a long running test IF you have many sessions with many results.
   - Likely you want to only run this locally, or if running with Checkly writestream the zip files you generate somewhere
   - Obviously security is a concern, if you're using SSO you'll have to manually add this account to your Checkly org. You can lockdown further.
   - This a workaround for a lack of a test session API and may be brittle. Likely you should create a Heartbeat check to make sure that this job is performing appropriately.
   - If using Checkly you likely also want to handle your environment variables outside of the env file because of the considerations for what env variables are available at runtime when using Checkly agents. 