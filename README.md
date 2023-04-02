# Reproduction

This is a reproduction of high memory consumption with the Next.js MF plugin. Note that this doesn't not require us to actually perform the federation to reproduce the memory consumption issues.

Go to `next-remote` folder and run
* `npm ci`
* `npm run dev`

You should see gc logs because of the `--trace-gc` flag.

Then go to [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx). Click somewhere in the file, and run "cmd + s" (macos) or "ctrl + s" (windows) to trigger HMR. To reproduce the memory increase, I spammed "cmd + s" (holding it down) to retrigger HMR a bunch of times, waited a little, then repeated.

Questions:
1. Why does the memory increase so much?
2. Why isn't the memory released?
 * It might have to do with the HMR of the Next.js MF plugin?
3. How can I inspect what webpack does to pinpoint this kind of memory issue in the future?

Note: I created `react-remote`, and it doesn't reproduce the memory leak. Although it consumes more memory using `material-icons`, at least it releases the memory. You can test `react-remote` by doing `npm ci` and `npm run start` and seeing the gc logs as you spam "cmd + s" in `Button.tsx` to trigger HMR. This leads me to believe that it doesn't have to do with the base Module Federation implementation.

You don't have to run `next-host` with `next-remote` to reproduce the issue.

I also tried running `next-remote` without module federation using `npm run dev:nomf`, and the memory problem doesn't exist. Based on this, I don't believe it's due to Next.js directly either.

Another experiment was run sharing `@mui/icons-material`, and it the issue still reproduces albeit more slowly.

Lastly, not using `@mui/icons-material` but still using the other `@mui` library causes this issue. I hold down `save` in the exposed component in `next-remote`, and I can see the memory shoot up over time.

