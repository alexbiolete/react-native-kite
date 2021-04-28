# Kitesurfing app for Atta Systems interview (Mobile Engineer Intern)

This project was built in React Native for the first stage of an interview with Atta Systems. The whole concept, design sketch and API were offered by them.

While it may not be a complex project, it was a learning process for me and it is not meant to function as a true standalone app as it is.

Kite is an app where you can manage your favourite (and less favourite) locations to practice, well... kitesurfing. You can save your favourite spots and the high season for each area, so you can easily pick the right place.

Even though it was not a requirement, I also implemented Register functionality. It creates a user that can be used for logging in.
Some creditendials for testing:
  - E-mail: demo@biolete.studio
  - Password: demo

## Implementation

I started by building each main view/screen (Index, Item, Filter), then I implemented methods to handle requests for each API endpoint. I refactored the code that I already had from the similar project I had to do in React.js, for the Frontend interview. Then I integrated React Navigation, built the logic for the navigation and coded the Login/Register views and functionality. I used React Native Maps for showing each Spot location and React Native Picker for the Filter form. The countries are parsed from each Spot object, sorted and duplicates are removed.

Spots are represented on the map based on Latitude and Longitude and each one that is associated with an element from the Favourites resource has a yellow pin, otherwise a red one.

I have also implemented some very basic Registration and Login functionalities.

## Known issues

The offline storage is not implemented properly yet, and the user "session" does not persist after restarting the app.

### References
* https://reactnative.dev/docs/
* https://www.youtube.com/watch?v=Hf4MJH0jDb4
* https://www.youtube.com/watch?v=pYh3Z-iBc4E
* https://github.com/react-native-maps/react-native-maps
* https://reactnavigation.org/docs/
* https://morioh.com/p/67f7be26bed0
* https://www.smashingmagazine.com/2020/03/sortable-tables-react/
* https://stackoverflow.com/questions/21700773/javascripts-sort-method-handling-of-capital-letters
* https://stackoverflow.com/questions/45439961/remove-duplicate-values-from-an-array-of-objects-in-javascript
