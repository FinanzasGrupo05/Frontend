import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
const MyPreset = definePreset(Aura, {
    components: {
        divider:{
            root: {
                borderColor: '#447c57'
            },
            content: {
                background: '{content.background}',
                color: '{text.color}'
            },
        },
        button: {
            colorScheme: {
                light: {
                    primary: {
                        color: '#fff',
                        hoverColor: '#fff',
                        activeColor: '#fff',

                        background: '#447c57',
                        hoverBackground: '#4e9366',
                        activeBackground: '#58A572',

                        borderColor: '#447c57',
                        hoverBorderColor: '#4e9366',
                        activeBorderColor: '#58a572',

                        focusRing: {
                            color: '{primary.color}',
                            shadow: 'none'
                        }
                    },
                    secondary:{
                        //black background with white text
                        color: '#fff',
                        hoverColor: '#fff',
                        activeColor: '#fff',

                        background: '#151515',
                        hoverBackground: '#333',
                        activeBackground: '#555',

                        borderColor: '#151515',
                        hoverBorderColor: '#333',
                        activeBorderColor: '#555',

                        focusRing: {
                            color: '{primary.color}',
                            shadow: 'none'
                        }
                    },
                    outlined: {
                        primary: {
                            hoverBackground: '#339c57',
                            activeBackground: '#58A572',
                            borderColor: '#339c57',
                            color: '#ffffff',
                        },
                        secondary: {
                            hoverBackground: '#fafafa',
                            activeBackground: '#ddd',
                            borderColor: '#111',
                            color: '#111',
                        }
                    }
                },
                dark: {
                    primary: {
                        color: '#ffffff',

                        background: '#447c57',
                        hoverBackground: '#',
                        activeBackground: '#58A572',

                        borderColor: '#2b4e37',
                        hoverBorderColor: '#339c57',
                        activeBorderColor: '#58A572',

                        hoverColor: '#ffffff',
                        activeColor: '#ffffff',
                        focusRing: {
                            color: '{primary.color}',
                            shadow: 'none'
                        }
                    },
                    secondary: {
                        color: '#000',
                        hoverColor: '#000',
                        activeColor: '#000',

                        background: '#eee',
                        hoverBackground: '#ddd',
                        activeBackground: '#aaa',

                        borderColor: '#eee',
                        hoverBorderColor: '#ddd',
                        activeBorderColor: '#aaa',

                        focusRing: {
                            color: '{primary.color}',
                            shadow: 'none'
                        }
                    },
                    outlined: {
                        primary: {
                            hoverBackground: '#339c57',
                            activeBackground: '#58A572',
                            borderColor: '#339c57',
                            color: '#ffffff',
                        },
                        secondary: {
                            hoverBackground: '#111',
                            activeBackground: '#333',
                            borderColor: '#111',
                            color: '#ffffff',
                        }
                    }
                }
            }
        },
        inputtext:{
            colorScheme: {
                light: {
                    color: '#111',
                    background: 'transparent',
                    disabledBackground: '#ccc',
                    borderColor: '#bbb',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    invalidBackground: '#ffa6a6',
                    placeholderColor: '#666',
                },
                dark: {
                    color: '#ffffff',
                    background: 'transparent',
                    disabledBackground: '#333',
                    borderColor: '#292929',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    hoverBorderColor: '#eee',
                    placeholderColor: '#fff',
                }
            }
        },
        textarea: {
            colorScheme: {
                light: {
                    color: '#111',
                    background: '#f0f0f0',
                    disabledBackground: '#ccc',
                    borderColor: '#bbb',
                    hoverBorderColor: '#bbb',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    invalidBackground: '#ffa6a6',
                    placeholderColor: '#fff',
                },
                dark: {
                    color: '#ffffff',
                    background: '#111',
                    disabledBackground: '#333',
                    borderColor: '#292929',
                    hoverBorderColor: '#FFFFFF',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    placeholderColor: '#fff',
                }
            }
        },
        carousel: {
            colorScheme: {
                light: {
                    indicator: {
                        background: '#acacac',
                        hoverBackground: '#d5d5d5',
                        activeBackground: '#447c57'
                    }
                },
                dark: {
                    indicator: {
                        background: '#2e2e2e',
                        hoverBackground: '#676767',
                        activeBackground: '#447c57'
                    }
                }
            }
        },
        inputgroup: {
            addon: {
                borderRadius: '0'
            }
        },
        toast: {
            colorScheme: {
                light: {
                    blur: '1.5px',
                    success: {
                        background: 'color-mix(in srgb, {green.50}, transparent 20%)',
                        borderColor: '{green.200}',
                        color: '{green.600}',
                        detailColor: '{surface.700}',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: '{green.100}',
                            focusRing: {
                                color: '{green.600}',
                                shadow: 'none'
                            }
                        }
                    },
                    warn: {
                        background: 'color-mix(in srgb,{yellow.50}, transparent 20%)',
                        borderColor: '{yellow.200}',
                        color: '#555500',
                        detailColor: '#555500',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: '{yellow.100}',
                            focusRing: {
                                color: '{yellow.600}',
                                shadow: 'none'
                            }
                        }
                    },
                    error: {
                        background: 'color-mix(in srgb, {red.50}, transparent 20%)',
                        borderColor: '{red.200}',
                        color: '{red.600}',
                        detailColor: '{surface.700}',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: '{red.100}',
                            focusRing: {
                                color: '{red.600}',
                                shadow: 'none'
                            }
                        }
                    },
                },
                dark: {
                    blur: '10px',
                    success: {
                        background: 'color-mix(in srgb, {green.500}, transparent 50%)',
                        borderColor: 'color-mix(in srgb, {green.700}, transparent 50%)',
                        color: '{green.500}',
                        detailColor: '{surface.0}',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: 'rgba(255, 255, 255, 0.05)',
                            focusRing: {
                                color: '{green.500}',
                                shadow: 'none'
                            }
                        }
                    },
                    warn: {
                        background: 'rgba(255,204,0,0.5)',//'color-mix(in srgb, {yellow.500}, transparent 40%)',
                        borderColor: 'rgba(255,204,0,0.5)',//'color-mix(in srgb, {yellow.700}, transparent 40%)',
                        color: '#754f00',
                        detailColor: '#555500',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: '#754f00',
                            focusRing: {
                                color: '{yellow.500}',
                                shadow: 'none'
                            }
                        }
                    },
                    error: {
                        background: 'color-mix(in srgb, {red.500}, transparent 50%)',
                        borderColor: 'color-mix(in srgb, {red.700}, transparent 50%)',
                        color: '#',
                        detailColor: '{surface.0}',
                        shadow: '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
                        closeButton: {
                            hoverBackground: 'rgba(255, 255, 255, 0.05)',
                            focusRing: {
                                color: '{red.500}',
                                shadow: 'none'
                            }
                        }
                    },
                }
            }
        },
        progressspinner: {
            colorScheme: {
                light: {
                    root: {
                        'color.1': '#447c57',
                        'color.2': '#447c57',
                        'color.3': '#447c57',
                        'color.4': '#447c57',
                    }
                },
                dark: {
                    root: {
                        'color.1': '#447c57',
                        'color.2': '#447c57',
                        'color.3': '#447c57',
                        'color.4': '#447c57',
                    }
                }
            }
        },
        select: {
            colorScheme: {
                light: {
                    color: '#111',
                    background: 'transparent',
                    disabledBackground: '#ccc',
                    borderColor: '#bbb',
                    hoverBorderColor: '#bbb',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    invalidBackground: '#ffa6a6',
                    placeholderColor: '#666',
                },
                dark: {
                    color: '#ffffff',
                    background: 'transparent',
                    disabledBackground: '#333',
                    borderColor: '#292929',
                    hoverBorderColor: '#FFFFFF',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    placeholderColor: '#fff',
                }
            }
        },
        multiselect: {
            colorScheme: {
                light: {
                    color: '#111',
                    background: 'transparent',
                    disabledBackground: '#ccc',
                    borderColor: '#bbb',
                    hoverBorderColor: '#bbb',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    invalidBackground: '#ffa6a6',
                    placeholderColor: '#666',
                },
                dark: {
                    color: '#ffffff',
                    background: 'transparent',
                    disabledBackground: '#333',
                    borderColor: '#292929',
                    hoverBorderColor: '#FFFFFF',
                    focusBorderColor: '#447c57',
                    invalidBorderColor: '#ff0000',
                    placeholderColor: '#fff',
                }
            }
        }
    },
    semantic: {
        transitionDuration: '0s',
        focusRing: {
            width: '2px',
            style: 'solid',
            color: '{primary.color}',
            offset: '2px',
            shadow: 'none'
        },
        iconSize: '1rem',
        anchorGutter: '0',
        primary: {
            50: "#f6f9f7",
            100: "#d5e4da",
            200: "#b3cebd",
            300: "#92b9a0",
            400: "#70a382",
            500: "#4f8e65",
            600: "#437956",
            700: "#376347",
            800: "#2b4e38",
            900: "#203928",
            950: "#142419"
        }
    }
});
export default MyPreset;