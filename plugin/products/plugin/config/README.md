# Plugin Local Configuration

This directory belongs only to the normal plugin product.

- Copy `allowed-directories.example.txt` to `allowed-directories.local.txt` and add one writable absolute path per line.
- Other `*.local.*` files may contain machine-specific plugin settings.
- Local configuration files are ignored by Git and must not contain roundtable settings.
- The example file is safe to commit; `allowed-directories.local.txt` must remain untracked.

Runtime permissions, audit records, saved images, and tool results belong under `../data`.
