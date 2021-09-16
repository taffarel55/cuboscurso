Passos para pegar o banco de filmes:

1. Esqueça o beekeeper (pelo menos no meu pc nao deu bom, mas tenta antes e me diz se deu certo)

2. Abre o psql via terminal com usuario certinho, no caso do do manjaro vai ser: sudo -iu postgres, acho que no de breno é só ir pra passo 3 e esquecer esse passo

3. quando tiver dentro do psql, roda esse comando ai, ele é bem fácil entender oq é cada parametro, só olhar ai, no caso vai ter que mudar o último parâmetro que é a localização do arquivo .sql
   psql -h localhost -d omdb -U postgres -p 5432 -a -q -f /home/taffarel55/omdb_pgdump.sql
