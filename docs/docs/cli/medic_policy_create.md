## medic policy create

Create a policy within a mediator control plane

### Synopsis

The medic policy create subcommand lets you create new policies for a group
within a mediator control plane.

```
medic policy create [flags]
```

### Options

```
  -f, --file string   Path to the YAML defining the policy (or - for stdin)
  -h, --help          help for create
```

### Options inherited from parent commands

```
      --config string      config file (default is $PWD/config.yaml)
      --grpc-host string   Server host (default "localhost")
      --grpc-port int      Server port (default 8090)
```

### SEE ALSO

* [medic policy](medic_policy.md)	 - Manage policies within a mediator control plane
