# Bingo
Projecte Joc Desenvolupament Web en l'Entorn Client
El meu projecte trata sobre un bingo, on podrem comensar una partida elegint els cartons que vuigam jugar, de 1 fins 4 cartons, si es el cas que elegim més d'un cartó hi haurà que marcar tots els números de tots els cartons.
Una vegada començada la partida hi haurà que anar polsant per a que ixquen més numeros del bombo, mentres vatgen eixint si la CPU té un número que ha eixit en el bombo es marcara soles, mentres que nosaltres tindrem que anar marcant-los amb el ratolí. Una vegada tinguem tots els números marcats de tots els cartons la aplicació farà una comprobació instantànea de si els número que tinguem al cartó están en la llista de númoer que ha tret el bombo, si no están tots es borraran inmediatament els que falten i si están tots ens mostrarà un missatge de que hem guanyat. En el cas de que la CPU marque tots abans haurem perdut. 
I una vegada acabada la partida podrem comensar un altra eixint al menú principal

Per a guardar les dades gastem Supabase per a la gestió de la base de datos i de l'autenticació d'usuaris, per a fer el registre i el login d'aquests. A més, es podrán guardar partidas, on cada usuari podrà cargar les seues pròpies partides per tornar a començar a jugar una partida anteriorment guardada.
