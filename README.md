# Reproduction

Go to `next-remote` and run
* `npm ci`
* `npm run dev:mf`

Then go to [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx). Click somewhere in the file, and run "cmd + s" (macos) or "ctrl + s" (windows) to trigger HMR. To reproduce the memory increase, I spammed "cmd + s" to retrigger HMR around 100 times, waited a little, then repeated.

Two questions:
1. Why does the memory increase so much?
2. Why isn't the memory released?
 * It might have to do with the HMR implementation of Next.js MF plugin? https://github.com/module-federation/universe/pull/228

## Summary

This icon import causes the problem. See [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx)
Following https://mui.com/material-ui/guides/minimizing-bundle-size/#development-environment
works, but I want to understand why this causes a very large increase
in memory when trigger lots of HMR

Without Module Federation, we consume lots of memory, but it's fine.
With Module Federation, there's more memory consumed, which can exceed
the 4gb default limit of Node.

