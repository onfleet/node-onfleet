const testData = {
  apiKey: 'a98b7123a973e8c903612e63c8c31a64',
  encodedApiKey: 'YTk4YjcxMjNhOTczZThjOTAzNjEyZTYzYzhjMzFhNjQ=',
  baseUrl: 'https://onfleet.com/api/v2/admins',
  url: 'https://onfleet.com/api/v2/admins/:adminId',
  id: '7p5Xl5HD1yG~xFqtIselXJjT',
  phone: '234564839',
  pathById: 'https://onfleet.com/api/v2/admins/7p5Xl5HD1yG~xFqtIselXJjT',
  pathWithEndpoint: 'https://onfleet.com/api/v2/admins/phone/234564839',
  parameters: {
    phone: '4055157789',
    state: '0',
  },
  pathWithQuery: 'https://onfleet.com/api/v2/admins?phone=4055157789&state=0',
  auth: {
    message: "Hello organization 'BxvqsKQBEeKGMeAsN09ScrVt' hitting Onfleet from 104.248.209.194",
    status: 200,
  },
  list: [
    {
      id: '4d86V7CHSsHzjCbXeakj6gXp',
      organization: 'BxvqsKQBEeKGMeAsN09ScrVt',
      email: 'james@onfleet.com',
      type: 'super',
      name: 'Onfleet Admin',
      isActive: true,
      phone: '+18881881788',
    },
    {
      id: 'hLedWP10pCKvDu7RIe2TfX~Q',
      organization: 'BxvqsKQBEeKGMeAsN09ScrVt',
      email: 'wrapper@onfleet.com',
      type: 'standard',
      name: 'Onfleet wrapper',
      isActive: false,
      phone: '+18881881789',
    },
  ],
  get: {
    id: 'SxD9Ran6pOfnUDgfTecTsgXd',
    organization: 'BxvqsKQBEeKGMeAsN09ScrVt',
    shortId: '44a56188',
    trackingURL: 'https://onf.lt/44a56188',
    worker: 'Mdfs*NDZ1*lMU0abFXAT82lM',
    merchant: 'BxvqsKQBEeKGMeAsN09ScrVt',
    executor: 'BxvqsKQBEeKGMeAsN09ScrVt',
    pickupTask: false,
    notes: 'Onfleet API Wrappers!',
    completionDetails: {
      events: [
        {
          name: 'start',
          time: 1555093046456,
        },
      ],
      failureReason: 'NONE',
      success: true,
    },
    destination: {
      id: '9qcJpfoqLwDppaZO8wYPFfsT',
      timeCreated: 1552586211000,
      timeLastModified: 1552586211499,
      location: [
        -121.79274459999999,
        37.7020352,
      ],
      address: {
        apartment: '',
        state: 'California',
        postalCode: '94103',
        country: 'United States',
        city: 'San Francisco',
        street: 'Market St',
        number: '929',
      },
    },
  },
  getRecipients: {
    id: '9SY28MU8PYaPP9Iq10bcpBdL',
    organization: 'BxvqsKQBEeKGMeAsN09ScrVt',
    name: 'Onfleet Rocks',
    phone: '+18881787788',
    skipSMSNotifications: false,
  },
  createTeams: {
    id: 'FFqPs1KHayxorfA~~xIj0us4',
    name: 'Onfleet Team',
    workers: [
      '1LjhGUWdxFbvdsTAAXs0TFos',
      'F8WPCqGmQYWpCkQ2c8zJTCpW',
    ],
    managers: [
      'Mrq7aKqzPFKX22pmjdLx*ohM',
    ],
    hub: 'tKxSfU7psqDQEBVn5e2VQ~*O',
  },
  getWorkerEta: {
    workerId: '56BsmZRWAKgGGG9g0xDczl6u',
    vehicle: 'CAR',
    steps: [
      {
        location: [101.5929671, 3.1484824],
        travelTime: 1738,
        distance: 21333,
        serviceTime: 120,
        arrivalTime: 1621339297,
        completionTime: 1621341129,
      },
      {
        location: [101.627378, 3.1403995],
        travelTime: 645,
        distance: 6348,
        serviceTime: 120,
        arrivalTime: 1621341774,
        completionTime: 1621341894,
      },
    ],
  },
  forceComplete: {
    status: 200,
    completionDetails: {
      notes: 'Forced complete by Onfleet Wrapper',
    },
  },
  updateWorkers: {
    id: 'Mdfs*NDZ1*lMU0abFXAT82lM',
    organization: 'BxvqsKQBEeKGMeAsN09ScrVt',
    name: 'Stephen Curry',
    displayName: 'SC30',
    phone: '+18883033030',
    activeTask: null,
    tasks: [
      'ybB97MGXhGoAAKrUAlyywmBN',
    ],
    onDuty: false,
    accountStatus: 'ACCEPTED',
    teams: [
      'W*8bF5jY11Rk05E0bXBHiGg2',
    ],
    vehicle: {
      id: 'fMuHImeUFAk3uv1O*GaXX5Zl',
      type: 'CAR',
      description: null,
      licensePlate: null,
      color: null,
    },
    addresses: {
      routing: null,
    },
  },
  deleteTask: 200,
  getTeamUnassignedTasks: {
    tasks: [
      {
        id: '3VtEMGudjwjjM60j7deSI123',
        timeCreated: 1643317843000,
        timeLastModified: 1643413337768,
        organization: 'nYrkNP6jZMSKgBwG9qG7ci3J',
        shortId: 'c77ff123',
        trackingURL: 'https://onf.lt/c77ff123',
        container: {
          type: 'TEAM',
          team: 'K3FXFtJj2FtaO2~H60evRrDc',
        },
      },
    ],
  },
  getWorkerAssignedTasks: {
    tasks: [
      {
        id: '3VtEMGudjwjjM60j7deSI987',
        timeCreated: 1643317843000,
        timeLastModified: 1643319602671,
        organization: 'nYrkNP6jZMSKgBwG9qG7ci3J',
        shortId: 'c77ff987',
        trackingURL: 'https://onf.lt/c77ff987',
        worker: 'ZxcnkJi~79nonYaMTQ960Mg2',
      },
    ],
  },
  getBatchByBachId: {
    status: 'succeeded',
    submitted: 'Less than a minute ago.',
    tasksReceived: 2,
    tasksCreated: 2,
    errors: [],
    failedTasks: [],
    succeededWithWarnings: [],
  },
  getManifestProvider: {
    manifestDate: 1694199600000,
    departureTime: 1694199600000,
    driver: {
      name: "Test One",
      phone: "+16265555768",
    },
    vehicle: {
      type: "CAR",
      description: "Honda",
      licensePlate: "12345687",
      color: "Purple",
      timeLastModified: 1692746334342,
    },
    hubAddress: "1111 South Figueroa Street, Los Angeles, California 90015",
    turnByTurn: [
      {
        start_address: "1403 W Pico Blvd, Los Angeles, CA 90015, USA",
        end_address: "2695 E Katella Ave, Anaheim, CA 92806, USA",
        eta: 1692992466000,
        driving_distance: "30.6 mi",
        steps: [
          "Head southeast on 12th St E toward S Figueroa StPartial restricted usage road",
          "Turn right onto Flower St",
          "Turn left onto the Interstate 10 E ramp to 18th St",
          "Merge onto I-10 E",
          "Take the exit onto I-5 S toward Santa Ana",
          "Take exit 109A for Katella Ave",
          "Turn right onto E Katella AvePass by Comerica Bank (on the right in 1.3 mi)",
          "Turn left onto S Douglass Rd",
          "Turn right onto Stanley Cup Wy",
          "Turn right"
        ]
      }
    ],
    totalDistance: null
  },
  createCustomFields: 200,
  getCustomFields: {
    fields: [
      {
        description: "this is a test",
        asArray: false,
        visibility: [
          "admin",
          "api",
          "worker"
        ],
        editability: [
          "admin",
          "api"
        ],
        key: "test",
        name: "test",
        type: "single_line_text_field",
        contexts: [
          {
            isRequired: false,
            conditions: [],
            name: "save"
          }
        ],
        value: "order 123"
      }
    ]
  }
};

// Export testData
export default testData;
