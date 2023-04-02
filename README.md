# Reproduction

This is a reproduction of high memory consumption with the Next.js MF plugin. Note that this doesn't not require us to actually perform the federation to reproduce the memory consumption issues.

Go to `next-remote` folder and run
* `npm ci`
* `npm run dev`

Then go to [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx). Click somewhere in the file, and run "cmd + s" (macos) or "ctrl + s" (windows) to trigger HMR. To reproduce the memory increase, I spammed "cmd + s" to retrigger HMR around 100 times, waited a little, then repeated.

Questions:
1. Why does the memory increase so much?
2. Why isn't the memory released?
 * It might have to do with the HMR implementation of Next.js MF plugin? https://github.com/module-federation/universe/pull/228
3. How can I inspect what webpack does to pinpoint this kind of memory issue in the future?

Note: I created `react-remote`, and it doesn't reproduce the memory leak. Although it consumes more memory using `material-icons`, at least it releases the memory. You can test `react-remote` by doing `npm ci` and `npm run start` and seeing the gc logs as you spam "cmd + s" in `Button.tsx` to trigger HMR. This leads me to believe that it doesn't have to do with the base Module Federation implementation.

You don't have to run `next-host` with `next-remote` to reproduce the issue.

I also tried running `next-remote` without module federation using `npm run dev:nomf`, and the memory problem doesn't exist. Based on this, I don't believe it's due to Next.js directly either.

Another experiment was run sharing `@mui/icons-material`, and it the issue still reproduces albeit more slowly.

## Summary

This icon import causes the problem. See [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx)
Following https://mui.com/material-ui/guides/minimizing-bundle-size/#development-environment
works, but I want to understand why this causes a very large increase
in memory when trigger lots of HMR

Without Module Federation, we consume lots of memory, but it's fine.
With Module Federation, there's more memory consumed, which can exceed
the 4gb default limit of Node.

