## medic completion powershell

Generate the autocompletion script for powershell

### Synopsis

Generate the autocompletion script for powershell.

To load completions in your current shell session:

	medic completion powershell | Out-String | Invoke-Expression

To load completions for every new session, add the output of the above command
to your powershell profile.


```
medic completion powershell [flags]
```

### Options

```
  -h, --help              help for powershell
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --config string      config file (default is $PWD/config.yaml)
      --grpc-host string   Server host (default "localhost")
      --grpc-port int      Server port (default 8090)
```

### SEE ALSO

* [medic completion](medic_completion.md)	 - Generate the autocompletion script for the specified shell

###### Auto generated by spf13/cobra on 30-Jun-2023