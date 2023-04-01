# Reproduction steps

This icon import causes the problem. See [ExposedComponent.tsx](./next-remote/components/ExposedComponent.tsx)
Following https://mui.com/material-ui/guides/minimizing-bundle-size/#development-environment
works, but I want to understand why this causes a very large increase
in memory when trigger lots of HMR

Without Module Federation, we consume lots of memory, but it's fine.
With Module Federation, there's more memory consumed, which can exceed
the 4gb default limit of Node.