# VocalShell
A web application connected to a Google Compute Engine VM that will listen to your commands and perform them in the linux-based terminal.

## Inspiration
The inspiration came from making the shell, which is integral to most developers’ workflows, convenient to use and accessible to more people (ie. handicapped people with restricted movement with arms).

## What it does
The web interface for VocalShell records the user’s voice when the mic button is pressed and held down, and once the recording is finished, it sends it to the Node.js server. Once the server receives the audio file, it then sends it to the Google Cloud Speech-to-Text service and receives a transcription. The transcription is then parsed to be matched to a shell command, and the shell output is sent back to be displayed on the website.

## How we built it
The VocalShell was built with Google Cloud services in mind, namely Speech-to-Text and Compute Engine. The Speech-to-Text service was used to transcribe MP3 files into text, and the Compute Engine was used to run the Node.js server. Running the Compute Engine proved to be much faster in using the Speech-to-Text service compared to a server on a local machine. As for the web interface, React framework was used with Bootstrap to quickly build a functional and clean user interface. An npm module was used to record voice on the website.

## Challenges we ran into
The biggest challenge we ran into was handling the audio encoding. Google Cloud Speech-to-Text only accepted certain audio encodings, which were not the same as the audio encodings of the recording libraries commonly available for React. Eventually we found a library that produced audio encoded in MP3, which was available as a beta feature in the Google Cloud service.

## Accomplishments that we’re proud of
We are proud of the amount of progress we have made, from coming up with the idea, to having a very functional prototype to demonstrate its utility.

## What we learned
We had to learn how to use various tools to build VocalShell. To build the front end, we learned how to use the Bootstrap framework alongside React to quickly build some of the components. We also learned how to handle audio files, from recording it to sending the data around for processing. Lastly, we learned how to set up the Google Cloud services to have our Node.js server run on a remote server and transcribing audio to text.

## What's next for VocalShell
The set of commands that VocalShell can currently accept is limited. A potential next step for VocalShell is to incorporate natural language processing to expand the commands it can accept to improve the interaction with the shell. It can also be improved to be able to interact with text editors such as Vim, along with other shell based programs. The program could also be integrated into a local shell such as bash, and for its web-based implementation, a database can be used to keep track of real-time logs of users’ command history.
