/**
* Author: Emily Sillars
* Description: This is an educational game for c programmers! 
* Eating the ASCII graphics sandwich demonstrates the difference in size
* between bytes, nybbles, and crumbs.
* 
* Food for thought: 
* Start by eating the sandwich byte by byte; the sandwich slowly disappears.
* Next, eat the sandwhich crumb by crumb; symbols change before disappearing!
* Why does this happen �
* 
* compile with: gcc -Wall -g -o s sandwich.c
* run with: ./s
* 
* Released: 1/2/20 on emilysillars.github.io/sandwich
*/

#include <stdio.h>
#include <string.h>
#include <math.h>
//commands
#define BITE 3
#define NYBBLE 4
#define CRUMB 5
#define EAT 6
#define HELP 7
#define QUIT 8
//game states
#define INTRO 0
#define RULES 1
#define GAME 2
#define WIN 3
//measurements
#define WORDSIZE 7  //max word size of seven characters, including null terminator.
#define LINESIZE 50 //max line size of 50 characters. Any more and game might break.

//stats
int bytes = 0;
int nybbles = 0;
int crumbs = 0;
int totalBitsLeft = 0;
int bitsLeft = 8;

//reading input
char input[WORDSIZE]; //input string (one 7 character word, max).
char line[LINESIZE];  //input line (50 characters, max).
int repeat = 1;       //flag
int command = -1;     //which commmand
int times = -1;       //repeat command this # of times

//printing
int startIndex = 17;
int endIndex = 1159;
char tempChar = 0;
char * helpScreen[21];
char * gameScreenTop[2];
char * gameScreenBottom[3];
char sandy[1160] ="                  ____________________________     _____\n                 ||---------------------------\\\\  /-----\\\\\n             ,---|| . . . . . . . . . . . . . .\\\\/. . . . \\\\----,\n             |   ||. . . . . . . . . . . . . . . . . . . . .\\\\  |\n             |   ||. . . . . . . . . . . . . . . . . . . . . || |\n             |   ||. . . . . . . . . . . . . . . . . . . . . || |\n             |   ||. . . . . . . . . . . . . . . . . . . . . || |\n             |   ||. . . . . . . . . . . . . . . . . . . . .//| |\n             |   ||. . . . . . . . . . . . . . . /\\ . . ....//| |\n             |   ||_._._.__._._._._._._._._._._./||\\._._._//||  |\n             |   | | | | | | | | | | | | | | | | ||| | | |||/   |\n             |   |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|,/\\|_|_|/,/     |\n             |                                                  |\n             `----,----------------------------------------,----'\n              (  ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) ( ) (,)\n               `\\/^\\_/^\\_/^\\_/^\\_/^\\_/^\\_/^\\_/^\\_/^\\_/^\\_/^\\__)\n                 | | | | | | | | | | | | | | | | ||| | | |||/\n                 |_|_|_|_|_|_|_|_|_|_|_|_|_|_|_|,/\\|_|_|/,/\n";
        
// commands
void bite();
void nybble();
void crumb();
void repeatCommand(int times);
// IO
int getAndParseLine();
// stats
int abs(int value);
void calculateBitsLeft();
// printing
void printfood();
void printCommandRejection();
void printRules();
void printWin();



int main() {
    gameScreenTop[0] = " ************************** SANDWICH SIMULATOR ***************************\n";
    gameScreenTop[1] = " *                                                                       *\n";
    gameScreenBottom[0] = " *                                                                       *\n";
    gameScreenBottom[1] = " *                                                                       *\n";
    gameScreenBottom[2] = " ***** Byte, nybble, or eat crumb by crumb! Type 'help' for more info. ***\n";
    helpScreen[0] = " *  ____________________________________________________________________ *\n";
    helpScreen[1] = " * |--------------------------------------------------------------------|*\n";
    helpScreen[2] = " * |                           --THE RULES--                            |*\n";
    helpScreen[3] = " * |                                                                    |*\n";
    helpScreen[4] = " * |     1 byte   = 8 bits:   [ ][ ][ ][ ][ ][ ][ ][ ]                  |*\n";
    helpScreen[5] = " * |     1 nybble = 4 bits:   [ ][ ][ ][ ]                              |*\n";
    helpScreen[6] = " * |     1 crumb  = 2 bits:   [ ][ ]                                    |*\n";
    helpScreen[7] = " * |                                                                    |*\n";
    helpScreen[8] = " * | 1.Type 'byte'+ press ENTER to bite the sandwich.                   |*\n";
    helpScreen[9] = " * | 2.Type 'nybble' + press ENTER to nibble the sandwich.              |*\n";
    helpScreen[10] = " * | 3.Type 'crumb' + press ENTER to eat a crumb from the sandwich.     |*\n";
    helpScreen[11] = " * | 4.Type <eat command> + <number> + press ENTER to repeat the        |*\n";
    helpScreen[12] = " * |   command <number> of times. For Ex. 'byte 5' will byte 5 times.   |*\n";
    helpScreen[13] = " * | 5.Type 'help' + press ENTER to return to this screen.              |*\n";
    helpScreen[14] = " * | 6.Type 'quit' + press ENTER to quit the game.                      |*\n";
    helpScreen[15] = " * |                                                                    |*\n";
    helpScreen[16] = " * |                           BON APPETIT!                             |*\n";
    helpScreen[17] = " * |                                                                    |*\n";
    helpScreen[18] = " * |                      Type 'eat' to start...                        |*\n";
    helpScreen[19] = " * |____________________________________________________________________|*\n";                                                                 
    helpScreen[20] = " *                                                                       *\n";
    char * intro[20];
    intro [0] = " * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n";
    intro [1] = " *                                                                  __   *\n";
    intro [2] = " *     /\\            __    __  __    __     __  ______    ___  __   | |  *\n";
    intro [3] = " *    /  \\    /^\\   |  \\   || | .\\   ||     || |__  __|  / _ \\ | |  | |  *\n";
    intro [4] = " *   / /|_\\  /  .\\  | \\ \\  || ||\\.\\  ||     ||    ||    | / \\/ | |  | |  *\n";
    intro [5] = " *   \\ \\    | /\\ .| | |\\ \\ || || \\.| ||     ||    ||    | |    | |__| |  *\n";
    intro [6] = " *    \\ \\   | || .| | | \\ \\|| || |.| || /^\\ ||    ||    | |    | ,--, |  *\n";
    intro [7] = " *   __\\ \\  |  _ .| | |  \\  | || /.| ||//^\\\\||    ||    | |    | |  | |  *\n";
    intro [8] = " *   \\ \\| / | | | | | |   \\ | ||/./  | /   \\\\|  __||__  | \\_/\\ | |  | |  *\n";
    intro [9] = " *    \\  /  |_| |_| |_|    \\| |__/   |/     \\| |______|  \\___/ |_|  | |  *\n";
    intro [10] = " *     \\/                                                           |_|  *\n";
    intro [11] = " *                                                                       *\n";
    intro [12] = " *                    __                 _  ___ _   _                    *\n";
    intro [13] = " *                    \\ `| |\\/| | | |   |_|  | / \\ |_\\                   *\n";
    intro [14] = " *                   \\_\\ | |  | |_| |__ | |  | \\_/ | \\                   *\n";
    intro [15] = " *                                                                       *\n";
    intro [16] = " *                                                                       *\n";
    intro [17] = " *                                                                       *\n";
    intro [18] = " *                         Type 'eat' to start...                        *\n";
    intro [19] = " *                                                                       *\n";
     
     char state = INTRO; //start by printing introduction screen.
     int j;
     for(j =0; j<20; j++){
      printf("%s",intro[j]);
     }
     calculateBitsLeft();
     getAndParseLine();
     //enter game loop
     while(command != QUIT){
      switch (state) {
        case GAME:    //playing the game
          if(repeat == 1){
            repeatCommand(times); 
            if (totalBitsLeft == 0){
            state = WIN;
            printWin();
            } 
            break;
          }
          switch(command){
            case BITE:
            bite();
            break;
            case NYBBLE:
            nybble();
            break;
            case CRUMB:
            crumb();
            break;
            case HELP:
            state = RULES;
            printRules();
            break;
            default:
            printCommandRejection();
          }
          if (totalBitsLeft == 0){
            state = WIN;
            printWin();
          }
          break;
        case RULES:   //reading the rules
          switch(command){
            case EAT:
            state = GAME;
            printfood();
            break;
            case BITE:
            printf("\n * You can't byte the sandwich here. Type 'eat' and then press ENTER to get to the sandwich.\n");
            break;
            case NYBBLE:
            printf("\n * You can't nybble the sandwich here. Type 'eat' and then press ENTER to get to the sandwich.\n");
            break;
            case CRUMB:
            printf("\n * You can't eat a crumb from the sandwich here. Type 'eat' and then press ENTER for the sandwich.\n");
            break;
            case HELP:
            state = RULES;
            printRules();
            break;
            default:
            printCommandRejection();
          }
          break;
        case INTRO:   //introduction screen
          switch(command){
            case EAT:
            state = GAME;
            printfood();
            break;
            case HELP:
            state = RULES;
            printRules();
            break;
            default:
            printCommandRejection();
          }
          break;
      }
      if(state == WIN){break;}
      getAndParseLine();
    }
  //exit game
  printf(" *                                                                       *\n * Exited simulator. See you later!                                      *\n *                                                                       *\n * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\n");
  return 0;
} //end of main

void bite(){
    if(totalBitsLeft < 8)
    {
        repeat = 0;
        printfood();
        printf(" * Cannot byte the sandwich! No more bytes left!\n");
    }
    else{
        command = BITE;
        bytes ++;
        bitsLeft -= 8;
        if(bitsLeft == 0){
          sandy[startIndex] = 0;
          startIndex ++;
          bitsLeft = 8;
        }
        else if(bitsLeft < 0){
          sandy[startIndex] = 0;
          startIndex ++;
          tempChar = sandy[startIndex];
          tempChar <<= abs(bitsLeft);
          sandy[startIndex] = tempChar;
          bitsLeft += 8;
        }
        else{
          printf("ERROR: somehow bitsLeft is > 0 after a bite!\n");
        }
        calculateBitsLeft();
        printfood();
     } 
}

void nybble(){
    if(totalBitsLeft < 4)
    {
        repeat = 0;
        printfood();
        printf(" * Cannot nybble the sandwich! No more nybbles left!\n");
    }
    else{
        command = NYBBLE;
        nybbles ++;
        bitsLeft -= 4;
        tempChar = sandy[startIndex];
        tempChar <<= 4;
        sandy[startIndex] = tempChar;
        if(bitsLeft == 0){
          startIndex ++;
          bitsLeft = 8;
        }
        else if(bitsLeft < 0){
          startIndex ++;
          tempChar = sandy[startIndex];
          tempChar <<= abs(bitsLeft);
          sandy[startIndex] = tempChar;
          bitsLeft += 8;
        }
        calculateBitsLeft();
        printfood();
     }   
}

void crumb(){
    if(totalBitsLeft < 2)
    {
        repeat = 0;
        printfood();
        printf("* Cannot eat a crumb from the sandwich! The sandwich is gone!\n");
    }
    else{
        command = CRUMB;
        crumbs ++;
        bitsLeft -= 2;
        tempChar = sandy[startIndex];
        tempChar <<= 2;
        sandy[startIndex] = tempChar;
        if(bitsLeft == 0){
          startIndex ++;
          bitsLeft = 8;
        }
        else if(bitsLeft < 0){
          startIndex ++;
          tempChar = sandy[startIndex];
          tempChar <<= abs(bitsLeft);
          sandy[startIndex] = tempChar;
          bitsLeft += 8;
        }
        calculateBitsLeft();
        printfood();
     }   
}

void printfood(){
  printf(" **** | 1 Byte = 8 bits | | 1 Nybble = 4 bits | | 1 Crumb = 2 bits |  ****\n");
  printf("%s",gameScreenTop[1]);
  printf("      Bytes: %i \tNybbles: %i\tCrumbs: %i \tBits Left: %i",bytes, nybbles, crumbs, totalBitsLeft);
  int i;
  printf("\n");
  for (i=0; i< endIndex; i++){
      printf("%c",sandy[i]);
  }
  printf("%s",gameScreenBottom[1]);
  printf("%s",gameScreenBottom[2]);
}

void printCommandRejection(){
  printf(" * Command not recognized. Type 'help' to see list of commands.\n"); 
}

void calculateBitsLeft(){
  totalBitsLeft = ((endIndex - startIndex) * 8) + bitsLeft;
}

void printRules(){
  int k;
  for(k = 0; k < 21; k++){
    printf("%s", helpScreen[k]);
  }
}

void printWin(){
      printf("\n **** | 1 Byte = 8 bits | | 1 Nybble = 4 bits | | 1 Crumb = 2 bits |  ****\n");
      printf("%s",gameScreenTop[1]);
      printf("      Bytes: %i \tNybbles: %i\tCrumbs: %i \tBits Left: %i\n",bytes, nybbles, crumbs, totalBitsLeft);
      printf("%s",gameScreenTop[1]);  
      printf(" *               Congratulations, you ate the sandwich!                  *\n");   
      printf("%s",gameScreenTop[1]);
      printf(" *  Sandwich contains 1143 bytes = %d bits.\n",(1143*8));
      printf(" *  Consumed %d bytes    = %d bits.\n",bytes, (bytes*8));
      printf(" *  Consumed %d nybbles  = %d bits.\n",nybbles, (nybbles*4));
      printf(" *  Consumed %d crumbs   = %d bits.\n",crumbs, (crumbs*2));
      printf(" *  %d + %d + %d = %d bits = every bit eaten!\n", (bytes*8), (nybbles*4),(crumbs*2),((bytes*8)+(nybbles*4)+(crumbs*2)));
      printf("%s",gameScreenTop[1]); 
    }

void repeatCommand(int times){
  int g = 0;
  switch(command){
    case BITE: //byte
    while(repeat != 0 && g < times){
      bite();
      g++;
    }
    break;
    case NYBBLE: //nybble
    while(repeat != 0 && g < times){
      nybble();
      g++;
    }
    break;
    case CRUMB: //crumb
    while(repeat != 0 && g < times){
      crumb();
      g++;
    }
    break;
    default:
    printf("ERROR: repeat function found an invalid value for variable command!");
    break;
  }
  repeat = -1;
}


int getAndParseLine(){
  fgets(line, LINESIZE, stdin); //get line
  sscanf(line,"%6s%i",input, &times); //parse command and number  
  repeat = -1;
  //determine which command
  if(strcmp(input,"quit") == 0){
    command = QUIT;
  }
  else if(strcmp(input,"nybble") == 0){
    command = NYBBLE;
    repeat = (times > 0) ? 1: -1;
  }
  else if(strcmp(input,"byte") == 0){
    command = BITE;
    repeat = (times > 0) ? 1: -1;
  }
  else if(strcmp(input,"crumb") == 0){
    command = CRUMB;
    repeat = (times > 0) ? 1: -1;
  }
  else if(strcmp(input,"help") == 0){
    command = HELP;
  }
  else if(strcmp(input,"eat") == 0){
    command = EAT;
  }
  else{
    command = -1;
  }
  //if invalid command, return failure
  return (command != -1);   
  }

int abs(int value){
      return (value >= 0) ? value: (-1)*value;
      //return value;
    }


