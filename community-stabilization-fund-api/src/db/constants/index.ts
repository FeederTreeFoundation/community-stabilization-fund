export const queries = {
  makeGetAllSql: (table: string) => `SELECT * FROM ${table}`,
  makeGetByIdSql: (table: string) => `SELECT * FROM ${table} WHERE id = ?`,
  makeCreateSql: (table: string) => `INSERT INTO ${table} (name) VALUES (?);`,
  makeDeleteSql: (table: string) => `DELETE FROM ${table} WHERE id = ?`,
  makeAuthenticateSql: (apiUser: string, token: string) => `
    SELECT users.id FROM users 
    JOIN api_keys ON users.id = api_keys.user_id 
    WHERE users.name = '${apiUser}' AND api_keys.name = '${token}'
  `,
  makeFormResponse: (body: any) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      phoneType,
      address,
      isBlack,
      isLocal,
      householdMembers,
      feminineHealthCare,
      hasFluSymptoms,
      itemRequests,
      additionalInformation,
      isPickUp,
      isVolunteering,
      isSubscribing,
      isJoining,
    } = body;
    return `INSERT INTO form_responses 
      (first_name, last_name, email, phone_number, phone_type, address_id, 
        is_black, is_local, household_members, feminine_health_care_id, has_flu_symptoms, item_requests, additional_information, is_pick_up, is_volunteering, is_subscribing)
      VALUES ("${firstName}", "${lastName}", "${email}", "${phoneNumber}", "${phoneType}", 
       ${address}, 
       ${isBlack || null}, 
       ${isLocal || null}, 
       ${householdMembers || null}, 
       ${(feminineHealthCare && feminineHealthCare.id) || null}, 
       ${hasFluSymptoms || null},
       ${itemRequests ? `"${itemRequests}"` : null}, 
       ${additionalInformation ? `"${additionalInformation}"` : null}, 
       ${isPickUp || null}, ${isVolunteering || null}, 
       ${isSubscribing || null})`;
  },
};
