import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export default function ChatbotScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello User! I'm Rhas, your Capital One virtual assistant ready to help you financially. How may I help you today?",
      isBot: true,
    },
    {
      id: '2',
      text: "Hello, Rhas! I wanted to know how to cut back on some subscriptions so that I can save more money. Do you have any suggestions?",
      isBot: false,
    },
    {
      id: '3',
      text: "Yes, I can help you!\n\nAfter reviewing your subscriptions, I see that you have two different streaming platforms: Amazon Prime and Hulu.\n\nOne option to save money would be to cancel your Hulu subscription, since many movies and shows are also available on Amazon Prime, along with additional benefits.\n\nAnother option would be to switch to a different streaming service, such as Netflix or Disney+, depending on the type of content you enjoy most.\n\nLet me know which option you prefer!",
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isBot: false,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header with decorative background */}
      <View style={styles.headerContainer}>
        <View style={styles.headerBackground}>
          <View style={styles.blueSection} />
          <View style={styles.redSlash} />
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerRightIcons}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="share-social-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="search-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View key={message.id} style={styles.messageWrapper}>
            {message.isBot && (
              <View style={styles.botAvatar}>
                <Ionicons name="chatbubbles" size={20} color="#666" />
              </View>
            )}
            <View style={[
              styles.messageBubble,
              message.isBot ? styles.botBubble : styles.userBubble
            ]}>
              <Text style={[
                styles.messageText,
                message.isBot ? styles.botText : styles.userText
              ]}>
                {message.text}
              </Text>
            </View>
            {!message.isBot && (
              <View style={styles.userAvatar}>
                <Ionicons name="person" size={20} color="#fff" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#2c5a7f" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <View style={styles.navIconCircle}>
            <Ionicons name="chatbubbles" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)')}>
          <Ionicons name="home-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/explore')}>
          <Ionicons name="settings-outline" size={28} color="#2c5a7f" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    height: 120,
    overflow: 'hidden',
  },
  headerBackground: {
    position: 'relative',
    height: 120,
  },
  blueSection: {
    backgroundColor: '#2c5a7f',
    height: '100%',
    width: '100%',
  },
  redSlash: {
    position: 'absolute',
    width: 150,
    height: 200,
    backgroundColor: '#D64545',
    transform: [{ rotate: '25deg' }],
    top: -50,
    right: -30,
  },
  headerIcons: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    padding: 4,
  },
  headerRightIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContent: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2c5a7f',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  botBubble: {
    backgroundColor: '#e8e8e8',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#2c5a7f',
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  botText: {
    color: '#000',
  },
  userText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#000',
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    // Active tab styling
  },
  navIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2c5a7f',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
