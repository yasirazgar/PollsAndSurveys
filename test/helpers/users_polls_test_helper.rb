module UsersPollsTestHelper
  private

  def yasir_snake_ans
    {
      'poll_id' => 1,
      'question' => 'Fav snake',
      'categories' => [[3, 'Animals']],
      'options' => {
        'Python' => {'option_id' => options(:python).id, 'percentage' => 50.0, 'selected' => true},
        'Cobra' =>  {'option_id' => options(:cobra).id, 'percentage' => 25.0, 'selected' => false},
        'Viper' =>  {'option_id' => options(:viper).id, 'percentage' => 25.0, 'selected' => false},
        'Mamba' =>  {'option_id' => options(:mamba).id, 'percentage' => 0.0,  'selected' => false}
      }
    }
  end

  def yasir_it_ans
    {
      'poll_id' => 2,
      'question' => 'Fav programming language',
      'categories' => [[1, "It"], [2, 'Programming languages']],
      'options' => {
        'Python'     => {'option_id' => options(:python).id, 'percentage' => 25.0, 'selected' => false},
        'Java'       => {'option_id' => options(:java).id, 'percentage' => 0.0,  'selected' => false},
        'JavaScript' => {'option_id' => options(:javascript).id, 'percentage' => 0.0,  'selected' => false},
        'Ruby'       => {'option_id' => options(:ruby).id, 'percentage' => 75.0, 'selected' => true}
      }
    }
  end

  def yasir_no_ans_ans
    {
      'poll_id' => 3,
      'question' => 'Some dumb question',
      'categories' => [],
      'options' => {
        'Crazy'    => {'option_id' => options(:crazy).id,  'percentage' => 0.0, 'selected' => false},
        'Stupid'   => {'option_id' => options(:stupid).id,  'percentage' => 0.0, 'selected' => false},
        'Annoying' => {'option_id' => options(:annoying).id,  'percentage' => 0.0, 'selected' => false}
      }
    }
  end

  def david_gems_ans
    {
      'poll_id' => 4,
      'question' => 'Fav gems',
      'categories' => [[4, 'Gems']],
      'options' => {
        'Ruby'     => {'option_id' => options(:ruby).id,  'percentage' => 25.0, 'selected' => true},
        'Gold'     => {'option_id' => options(:gold).id,  'percentage' => 25.0, 'selected' => false},
        'Dimond'   => {'option_id' => options(:dimond).id,  'percentage' => 25.0, 'selected' => false},
        'Emerald'  => {'option_id' => options(:emerald).id, 'percentage' => 0.0,  'selected' => false},
        'Platinum' => {'option_id' => options(:platinum).id, 'percentage' => 25.0, 'selected' => false}
      }
    }
  end

  def expected_users_poll
    @expected_users_poll ||= [
      yasir_snake_ans,
      yasir_it_ans,
      yasir_no_ans_ans
    ]
  end

  def expected_user_responded_polls
    @expected_user_responded_polls ||= [
      yasir_snake_ans,
      yasir_it_ans,
      david_gems_ans
    ]
  end
end
