import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ClientFormData {
    name: string;
    email: string;
    phone: string;
    frequency: 'ONCE' | 'TWICE' | 'TRICE';
    advanceAmount: number;
    ratePerTiffine: number;
    dateOfStart: string;
}

interface AddClientModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ visible, onClose }) => {
    const [formData, setFormData] = useState<ClientFormData>({
        name: '',
        email: '',
        phone: '',
        frequency: 'ONCE',
        advanceAmount: 0,
        ratePerTiffine: 0,
        dateOfStart: '',
    });

    const handleChange = (name: keyof ClientFormData, value: string) => {
        if (name === 'advanceAmount' || name === 'ratePerTiffine') {
            setFormData(prev => ({ ...prev, [name]: Number(value) || 0 }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        console.log(formData)

        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 bg-black/50 justify-center items-center"
            >
                <View className="bg-white w-[90%] max-h-[85%] rounded-2xl overflow-hidden shadow-xl">
                    {/* Header */}
                    <View className="bg-indigo-600 px-5 py-4 flex-row justify-between items-center">
                        <Text className="text-xl font-bold text-white">Add New Client</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
                        {/* Name */}
                        <View className="mb-4 space-y-1">
                            <Text className="text-sm font-semibold text-gray-600 ml-1">Full Name</Text>
                            <TextInput
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                placeholder="Enter client name"
                                value={formData.name}
                                onChangeText={(text) => handleChange('name', text)}
                            />
                        </View>

                        {/* Email & Phone Grid */}
                        <View className="flex-row gap-3 mb-4">
                            <View className="flex-1 space-y-1">
                                <Text className="text-sm font-semibold text-gray-600 ml-1">Email</Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                    placeholder="client@mail.com"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={formData.email}
                                    onChangeText={(text) => handleChange('email', text)}
                                />
                            </View>
                            <View className="flex-1 space-y-1">
                                <Text className="text-sm font-semibold text-gray-600 ml-1">Phone</Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                    placeholder="1234567890"
                                    keyboardType="phone-pad"
                                    value={formData.phone}
                                    onChangeText={(text) => handleChange('phone', text)}
                                />
                            </View>
                        </View>

                        {/* Frequency */}
                        <View className="mb-4 space-y-1">
                            <Text className="text-sm font-semibold text-gray-600 ml-1">Frequency</Text>
                            <View className="flex-row bg-gray-100 p-1 rounded-xl">
                                {['ONCE', 'TWICE', 'TRICE'].map((freq) => (
                                    <TouchableOpacity
                                        key={freq}
                                        onPress={() => handleChange('frequency', freq as any)}
                                        className={`flex-1 py-2 items-center rounded-lg ${formData.frequency === freq ? 'bg-white shadow-sm' : ''}`}
                                    >
                                        <Text className={`font-medium ${formData.frequency === freq ? 'text-indigo-600' : 'text-gray-500'}`}>
                                            {freq}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Date */}
                        <View className="mb-4 space-y-1">
                            <Text className="text-sm font-semibold text-gray-600 ml-1">Date of Start</Text>
                            <TextInput
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                placeholder="YYYY-MM-DD"
                                value={formData.dateOfStart}
                                onChangeText={(text) => handleChange('dateOfStart', text)}
                            />
                        </View>

                        {/* Amounts Grid */}
                        <View className="flex-row gap-3 mb-4">
                            <View className="flex-1 space-y-1">
                                <Text className="text-sm font-semibold text-gray-600 ml-1">Advance</Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    value={formData.advanceAmount}
                                    onChangeText={(text) => handleChange('advanceAmount', text)}
                                />
                            </View>
                            <View className="flex-1 space-y-1">
                                <Text className="text-sm font-semibold text-gray-600 ml-1">Rate/Tiffin</Text>
                                <TextInput
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    value={formData.ratePerTiffine}
                                    onChangeText={(text) => handleChange('ratePerTiffine', text)}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Footer Actions */}
                    <View className="p-5 border-t border-gray-100 flex-row gap-3 bg-white">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 py-3.5 border border-gray-200 rounded-xl items-center"
                        >
                            <Text className="text-gray-600 font-semibold">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="flex-1 py-3.5 bg-indigo-600 rounded-xl items-center shadow-lg shadow-indigo-200"
                        >
                            <Text className="text-white font-semibold">Create Client</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddClientModal;
