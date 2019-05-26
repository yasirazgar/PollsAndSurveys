module UsersPollsTestHelper
  YASIR_SNAKE_ANS = {
    'poll_id' => 1,
    'question' => 'Fav snake',
    'categories' => [[3, 'Animals']],
    'options' => {
      'Python' => {'percentage' => 50.0, 'selected' => true},
      'Cobra' => {'percentage' => 25.0, 'selected' => false},
      'Viper' => {'percentage' => 25.0, 'selected' => false},
      'Mamba' => {'percentage' => 0.0, 'selected' => false}
    }
  }
  YASIR_IT_ANS = {
    'poll_id' => 2,
    'question' => 'Fav programming language',
    'categories' => [[1, "It"], [2, 'Programming languages']],
    'options' => {
      'Python' => {'percentage' => 25.0, 'selected' => false},
      'Ruby' => {'percentage' => 75.0, 'selected' => true},
      'Java' =>  {'percentage' => 0.0, 'selected' => false},
      'JavaScript' =>  {'percentage' => 0.0, 'selected' => false}
    }
  }
  YASIR_NO_ANS_ANS = {
    'poll_id' => 3,
    'question' => 'Some dumb question',
    'categories' => [],
    'options' => {
      'Crazy' => {'percentage' => 0.0, 'selected' => false},
      'Stupid' => {'percentage' => 0.0, 'selected' => false},
      'Annoying' => {'percentage' => 0.0, 'selected' => false}
    }
  }
  DAVID_GEMS_ANS = {
    'poll_id' => 4,
    'question' => 'Fav gems',
    'categories' => [[4, 'Gems']],
    'options' => {
      'Platinum' => {'percentage' => 25.0, 'selected' => false},
      'Dimond' => {'percentage' => 25.0, 'selected' => false},
      'Gold' => {'percentage' => 25.0, 'selected' => false},
      'Ruby' => {'percentage' => 25.0, 'selected' => true},
      'Emerald' => {'percentage' => 0.0, 'selected' => false}
    }
  }

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
