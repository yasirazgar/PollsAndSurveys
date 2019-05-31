module UsersPollsTestHelper
  YASIR_SNAKE_ANS = {
    'poll_id' => 1,
    'question' => 'Fav snake',
    'categories' => [[3, 'Animals']],
    'options' => {
      'Python' => {'option_id' => 1, 'percentage' => 50.0, 'selected' => true},
      'Cobra' =>  {'option_id' => 2, 'percentage' => 25.0, 'selected' => false},
      'Viper' =>  {'option_id' => 3, 'percentage' => 25.0, 'selected' => false},
      'Mamba' =>  {'option_id' => 4, 'percentage' => 0.0,  'selected' => false}
    }
  }.freeze
  YASIR_IT_ANS = {
    'poll_id' => 2,
    'question' => 'Fav programming language',
    'categories' => [[1, "It"], [2, 'Programming languages']],
    'options' => {
      'Python'     => {'option_id' => 1, 'percentage' => 25.0, 'selected' => false},
      'Java'       => {'option_id' => 5, 'percentage' => 0.0,  'selected' => false},
      'JavaScript' => {'option_id' => 6, 'percentage' => 0.0,  'selected' => false},
      'Ruby'       => {'option_id' => 7, 'percentage' => 75.0, 'selected' => true}
    }
  }.freeze
  YASIR_NO_ANS_ANS = {
    'poll_id' => 3,
    'question' => 'Some dumb question',
    'categories' => [],
    'options' => {
      'Crazy'    => {'option_id' => 12,  'percentage' => 0.0, 'selected' => false},
      'Stupid'   => {'option_id' => 13,  'percentage' => 0.0, 'selected' => false},
      'Annoying' => {'option_id' => 14,  'percentage' => 0.0, 'selected' => false}
    }
  }.freeze
  DAVID_GEMS_ANS = {
    'poll_id' => 4,
    'question' => 'Fav gems',
    'categories' => [[4, 'Gems']],
    'options' => {
      'Ruby'     => {'option_id' => 7,  'percentage' => 25.0, 'selected' => true},
      'Gold'     => {'option_id' => 8,  'percentage' => 25.0, 'selected' => false},
      'Dimond'   => {'option_id' => 9,  'percentage' => 25.0, 'selected' => false},
      'Emerald'  => {'option_id' => 10, 'percentage' => 0.0,  'selected' => false},
      'Platinum' => {'option_id' => 11, 'percentage' => 25.0, 'selected' => false}
    }
  }.freeze

  private

  def expected_users_poll
    @expected_users_poll ||= [
      YASIR_SNAKE_ANS,
      YASIR_IT_ANS,
      YASIR_NO_ANS_ANS
    ]
  end

  def expected_user_responded_polls
    @expected_user_responded_polls ||= [
      YASIR_SNAKE_ANS,
      YASIR_IT_ANS,
      DAVID_GEMS_ANS
    ]
  end

end
