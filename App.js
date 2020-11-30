import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export default class App extends Component {
  constructor(props) {
    super(props);
    const urlSource = 'https://source.unsplash.com/350x350/daily';

    const imageSearchTerms = [
      'Universe',
      'Sports',
      'Nature',
      'Mountains',
      'Snow',
      'Space',
      'Sunrise',
      'Sience',
      'Holiday',
      'Ocean',
      'Sunset',
      'Water',
      'Christmas'
    ]

    this.state = {
      showCarousel: false,
      layoutType: 'default', // stack, tinder
      imageSearchTerms,
      urlSource,
    }

    // Download the image and save to disk cache
    Image.prefetch(`${urlSource}?${imageSearchTerms}`);
  }

  toggleCarousel = () => {
    this.setState({ showCarousel: !this.state.showCarousel });
  }
  
  renderControls = () => {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleCarousel} style={styles.openButton}>
          <Text style={styles.openButtonText}>Slide Show</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{ uri: `${this.state.urlSource}?${item}`}} />
        <Text style={styles.label}>{item}</Text>
      </View>
    );
  }

  renderCarousel = () => {
    return(
      <View style={styles.carouselContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={this.toggleCarousel} style={styles.button}>
            <Text style={styles.label}>x</Text>
          </TouchableOpacity>
        </View>

        <Carousel
          layout={this.state.layoutType}
          data={this.state.imageSearchTerms}
          renderItem={this.renderItem}
          sliderWidth={350}
          itemWidth={350}
        >
        </Carousel>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        { this.state.showCarousel ? this.renderCarousel() : this.renderControls() }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    width: 420,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  botton:{
    color: '#474747'
  },
  label: {
    fontSize: 30,
    padding: 40,
    color: '#474747'
  },
  openButton: {
    padding: 10,
    backgroundColor: '#000'
  },
  openButtonText: {
    fontSize: 20,
    padding: 20,
    color: '#fff',
  },
  closeButton: {
    padding: 10
  }
});

// expo init my-app
// expo install react-native-snap-carousel @react-native-community/picker
// https://snack.expo.io/@vitkor/carousel-simple-example
